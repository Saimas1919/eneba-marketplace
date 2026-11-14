import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Globe, Loader2 } from 'lucide-react'
import { api } from '../lib/api'
import { useAuth } from '../hooks/useAuth'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function Login() {
  useDocumentTitle("Log In | Eneba");

  const navigate = useNavigate()
  const { login } = useAuth()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await api.login({ email, password })
      login(res.user, res.token)
      navigate('/')
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-[#1f0a4e] text-white font-sans">
      <header className="px-10 py-6 shrink-0">
        <Link to="/"><img src="/logo.png" alt="Eneba" className="h-8 w-auto object-contain" /></Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-10 overflow-hidden">
        <div className="max-w-[1500px] w-full flex flex-row items-center justify-between gap-12 h-full">
          <div className="flex-1 text-left">
            <h1 className="text-5xl md:text-6xl lg:text-[70px] xl:text-[80px] font-extrabold tracking-tight leading-[1.1] mb-4 whitespace-nowrap">
              Hi!<br />It's nice to see you!
            </h1>
          </div>

          <div className="w-[420px] bg-[#4618ac] p-8 shadow-2xl shrink-0">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-1">Log in</h2>
              <p className="text-sm text-white/70">
                New user? <Link to="/register" className="text-[#FFCC00] hover:underline">Create account</Link>
              </p>
            </div>

            {error && <div className="bg-red-500/20 border border-red-500 text-red-100 text-sm px-4 py-2 mb-4">{error}</div>}

            <div className="flex flex-col gap-2 mb-6 opacity-50 pointer-events-none">
              <button className="w-full bg-white text-black font-bold text-sm h-11 flex items-center justify-center gap-3">Continue with Google</button>
              <button className="w-full bg-[#4267B2] text-white font-bold text-sm h-11 flex items-center justify-center gap-3">Continue with Facebook</button>
              <button className="w-full bg-black text-white font-bold text-sm h-11 flex items-center justify-center gap-3">Continue with Apple</button>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-white/10"></div>
              <span className="text-xs text-white/50 lowercase">or</span>
              <div className="flex-1 h-px bg-white/10"></div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-[#310c7a] border border-transparent focus:border-[#FFCC00] h-12 px-4 text-sm text-white outline-none" />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full bg-[#310c7a] border border-transparent focus:border-[#FFCC00] h-12 px-4 text-sm text-white outline-none" />
              
              <button type="submit" disabled={loading} className="w-full bg-[#FFCC00] hover:bg-[#ffdc4d] text-black font-bold text-sm h-12 mt-2 flex items-center justify-center">
                {loading ? <Loader2 size={20} className="animate-spin" /> : "Log in"}
              </button>
            </form>

            <p className="text-[11px] text-white/50 text-center mt-4">
              Hint: Try testing with <strong className="text-white">test@eneba.com</strong> / <strong className="text-white">password123</strong>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}