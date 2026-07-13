'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-ec-paper flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-ec-green mx-auto mb-4">
            <path d="M16 28C16 28 8 20 8 12C8 7.6 11.6 4 16 4C20.4 4 24 7.6 24 12C24 20 16 28 16 28Z"
              stroke="currentColor" strokeWidth="1.5" fill="none"/>
          </svg>
          <h1 className="font-script text-3xl text-ec-black mb-1">Evercrafted</h1>
          <p className="text-ec-ink text-sm">Collection Intelligence Studio</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white rounded-xl border border-ec-border p-8">
          <h2 className="font-serif text-2xl font-medium text-ec-black mb-6">Sign in</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block font-mono text-[9px] uppercase tracking-widest text-ec-ink mb-2">Email</label>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full px-4 py-2.5 border border-ec-border rounded-md text-sm focus:outline-none focus:border-ec-green transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div className="mb-6">
            <label className="block font-mono text-[9px] uppercase tracking-widest text-ec-ink mb-2">Password</label>
            <input
              type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
              className="w-full px-4 py-2.5 border border-ec-border rounded-md text-sm focus:outline-none focus:border-ec-green transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-3 bg-ec-black text-white text-sm font-medium rounded-md hover:bg-ec-charcoal transition-colors disabled:opacity-50">
            {loading ? 'Signing in...' : 'Sign in'}
          </button>

          <p className="text-center text-sm text-ec-ink mt-4">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-ec-green hover:text-ec-green-light">Create one →</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
