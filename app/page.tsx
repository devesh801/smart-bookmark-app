'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../src/lib/supabase'

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [bookmarks, setBookmarks] = useState<any[]>([])
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }

    getUser()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (!user) return

    fetchBookmarks()

    const channel = supabase
      .channel('bookmarks-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookmarks',
        },
        () => {
          fetchBookmarks()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [user])


  const fetchBookmarks = async () => {
    const { data, error } = await supabase
      .from('bookmarks')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error) {
      setBookmarks(data)
    }
  }

  const addBookmark = async () => {
    if (!title.trim() || !url.trim()) {
      alert('Please enter both title and URL')
      return
    }

    await supabase.from('bookmarks').insert([
      {
        title,
        url,
        user_id: user.id,
      },
    ])

    setTitle('')
    setUrl('')
    fetchBookmarks()
  }

  const deleteBookmark = async (id: string) => {
    await supabase.from('bookmarks').delete().eq('id', id)
    fetchBookmarks()
  }

  const signIn = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' })
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  return (
  <div className="min-h-screen bg-slate-100 flex justify-center py-10 px-4">
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-8">

      {!user ? (
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-bold text-slate-800">
            Smart Bookmark Manager
          </h1>

          <p className="text-slate-600">
            Save and manage your personal bookmarks securely.
          </p>

          <button
            onClick={signIn}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition duration-200"
          >
            Sign in with Google
          </button>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-lg font-semibold text-slate-800">
              Welcome, {user.email}
            </h2>

            <button
              onClick={signOut}
              className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg transition duration-200"
            >
              Logout
            </button>
          </div>

          {/* Add Bookmark */}
          <div className="mb-8 border rounded-xl p-5 bg-slate-50">
            <h3 className="text-md font-semibold text-slate-700 mb-4">
              Add New Bookmark
            </h3>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Bookmark title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />

              <input
                type="text"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />

              <button
                onClick={addBookmark}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition duration-200"
              >
                Add Bookmark
              </button>
            </div>
          </div>

          {/* Bookmark List */}
          <div className="space-y-4">
            {bookmarks.length === 0 ? (
              <p className="text-slate-500 text-center">
                No bookmarks added yet.
              </p>
            ) : (
              bookmarks.map((bookmark) => (
                <div
                  key={bookmark.id}
                  className="border rounded-xl p-4 flex justify-between items-center bg-white shadow-sm"
                >
                  <div>
                    <p className="font-semibold text-slate-800">
                      {bookmark.title}
                    </p>

                    <a
                      href={bookmark.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline text-sm"
                    >
                      {bookmark.url}
                    </a>
                  </div>

                  <button
                    onClick={() => deleteBookmark(bookmark.id)}
                    className="bg-rose-500 hover:bg-rose-600 text-white px-3 py-1 rounded-md transition duration-200"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  </div>
)

}
