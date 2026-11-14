import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react' // <-- Removed Globe
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
        <Link to="/">
          <img src="/logo.png" alt="Eneba" className="h-8 w-auto object-contain" />
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-10 overflow-hidden">
        <div className="max-w-[1500px] w-full flex flex-row items-center justify-between gap-12 h-full">
          
          <div className="flex-1 text-left">
            <h1 className="text-5xl md:text-6xl lg:text-[70px] xl:text-[80px] font-extrabold tracking-tight leading-[1.1] mb-4 whitespace-nowrap">
              Hi!<br />
              It's nice to see you!
            </h1>
          </div>

          <div className="w-[420px] bg-[#4618ac] p-8 shadow-2xl shrink-0">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-1">Log in</h2>
              <p className="text-sm text-white/70">
                New user? <Link to="/register" className="text-[#FFCC00] hover:underline">Create account</Link>
              </p>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-100 text-sm px-4 py-2 mb-4">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-2 mb-6 opacity-50 pointer-events-none">
              <button className="w-full bg-white text-black font-bold text-sm h-11 flex items-center justify-center gap-3">
                <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Continue with Google
              </button>
              
              <button className="w-full bg-[#4267B2] text-white font-bold text-sm h-11 flex items-center justify-center gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Continue with Facebook
              </button>

              <button className="w-full bg-black text-white font-bold text-sm h-11 flex items-center justify-center gap-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.03 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.56-1.702"/></svg>
                Continue with Apple
              </button>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-white/10"></div>
              <span className="text-xs text-white/50 lowercase">or</span>
              <div className="flex-1 h-px bg-white/10"></div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#310c7a] border border-transparent focus:border-[#FFCC00] h-12 px-4 text-sm text-white placeholder:text-white/50 outline-none transition-colors"
              />
              
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#310c7a] border border-transparent focus:border-[#FFCC00] h-12 px-4 text-sm text-white placeholder:text-white/50 outline-none transition-colors"
              />
              
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#FFCC00] hover:bg-[#ffdc4d] disabled:bg-[#FFCC00]/50 disabled:cursor-not-allowed text-black font-bold text-sm h-12 transition-colors mt-2 flex items-center justify-center"
              >
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