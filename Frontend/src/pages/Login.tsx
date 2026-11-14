import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2, Globe } from 'lucide-react'
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
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!showPassword) {
      // Handle Magic Link (Mock for now since backend doesn't support it)
      alert("Magic link sent! Check your email.")
      return
    }

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
    <div className="min-h-screen flex flex-col bg-[#4618ac] text-white font-sans">
      
      {/* HEADER */}
      <header className="px-6 py-8 md:px-12 md:py-10 shrink-0">
        <Link to="/">
          <img src="/logo.png" alt="Eneba" className="h-10 md:h-12 w-auto object-contain" />
        </Link>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col items-center px-4 w-full pb-12">
        <div className="w-full max-w-[420px]">
          
          {/* TITLE */}
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold mb-2">Log in</h1>
            <p className="text-[15px] text-white/80">
              New user? <Link to="/register" className="text-[#FFCC00] hover:underline font-bold">Create account</Link>
            </p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-100 text-sm px-4 py-2 mb-6">
              {error}
            </div>
          )}

          {/* SOCIAL BUTTONS */}
          <div className="flex flex-col gap-3 mb-6">
            <button className="w-full bg-white text-black font-bold text-[15px] h-14 flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Continue with Google
            </button>
            
            <button className="w-full bg-[#5c73e6] text-white font-bold text-[15px] h-14 flex items-center justify-center gap-3 hover:bg-[#4b5fd6] transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Continue with Facebook
            </button>

            <button className="w-full bg-black text-white font-bold text-[15px] h-14 flex items-center justify-center gap-3 hover:bg-gray-900 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.03 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.56-1.702"/></svg>
              Continue with Apple
            </button>
          </div>

          {/* SMALL SOCIAL ICONS ROW */}
          <div className="w-full border border-white/20 flex items-center justify-around h-16 mb-6">
            <button className="text-white hover:text-[#FFCC00] transition-colors p-2">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12.004 2a10.004 10.004 0 00-10 10 10.004 10.004 0 006.917 9.6c.46.09.636-.204.636-.456v-1.593c-2.32.49-2.814-1.115-2.814-1.115-.374-.965-.926-1.22-.926-1.22-.756-.51.057-.505.057-.505.84.06 1.285.875 1.285.875.75 1.287 1.96.918 2.44.7.077-.55.297-.917.542-1.126-1.896-.215-3.89-.948-3.89-4.22 0-.93.33-1.69.875-2.286-.088-.216-.378-1.084.084-2.257 0 0 .71-.226 2.33.87a8.122 8.122 0 014.242 0c1.62-1.096 2.33-.87 2.33-.87.462 1.173.172 2.04.084 2.257.545.596.875 1.356.875 2.286 0 3.28-2.004 4.004-3.905 4.22.308.266.582.79.582 1.59v2.35c0 .255.17.55.638.456A10.004 10.004 0 0022.004 12a10.004 10.004 0 00-10-10z"/></svg>
            </button>
            <button className="text-white hover:text-[#FFCC00] transition-colors p-2">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/></svg>
            </button>
            <button className="text-white hover:text-[#FFCC00] transition-colors p-2">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h4.286v2.571L8.571 24h2.858l2.285-2.285h3.429l4.286-4.286V4.286L18.714 0zm12 19.714l-2.571 2.572h-5.143l-2.286 2.285v-2.285H4.286V4.286h13.714z"/></svg>
            </button>
            <button className="text-white hover:text-[#FFCC00] transition-colors p-2">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </button>
          </div>

          {/* OR DIVIDER */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-white/20"></div>
            <span className="text-sm text-white/50 lowercase">or</span>
            <div className="flex-1 h-px bg-white/20"></div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#3a1390] border border-transparent focus:border-[#FFCC00] h-14 px-4 text-[15px] text-white placeholder:text-white/60 outline-none transition-colors"
            />
            
            {showPassword && (
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#3a1390] border border-transparent focus:border-[#FFCC00] h-14 px-4 text-[15px] text-white placeholder:text-white/60 outline-none transition-colors"
              />
            )}
            
            {!showPassword ? (
              <div className="flex flex-col gap-3 mt-1">
                <button 
                  type="submit" 
                  className="w-full bg-[#FFCC00] hover:bg-[#ffdc4d] text-black font-bold text-[15px] h-14 transition-colors"
                >
                  Get magic link
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowPassword(true)}
                  className="w-full bg-transparent border border-white hover:bg-white/10 text-white font-bold text-[15px] h-14 transition-colors"
                >
                  Log in with password
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 mt-1">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-[#FFCC00] hover:bg-[#ffdc4d] disabled:bg-[#FFCC00]/50 disabled:cursor-not-allowed text-black font-bold text-[15px] h-14 transition-colors flex items-center justify-center"
                >
                  {loading ? <Loader2 size={22} className="animate-spin" /> : "Log in"}
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowPassword(false)}
                  className="w-full bg-transparent border border-white hover:bg-white/10 text-white font-bold text-[15px] h-14 transition-colors"
                >
                  Back to magic link
                </button>
              </div>
            )}
          </form>

          <p className="text-[11px] text-white/50 text-center mt-6">
            Hint: Try testing with <strong className="text-white">test@eneba.com</strong> / <strong className="text-white">password123</strong> (Click "Log in with password")
          </p>

        </div>

        {/* FOOTER LINKS */}
        <div className="mt-16 flex flex-col items-center gap-4 text-[14px] font-bold text-white">
          <button className="flex items-center gap-2 hover:text-[#FFCC00] transition-colors">
            <Globe size={18} /> English EU
          </button>
          <Link to="/terms" className="hover:text-[#FFCC00] transition-colors">Terms & Conditions</Link>
          <Link to="/privacy" className="hover:text-[#FFCC00] transition-colors">Privacy notice</Link>
          <Link to="/cookies" className="hover:text-[#FFCC00] transition-colors">Cookie preferences</Link>
          <Link to="/support" className="hover:text-[#FFCC00] transition-colors">Support</Link>
          <p className="text-[12px] text-white/60 font-normal mt-2">
            Copyright © 2026 Eneba. All Rights Reserved.
          </p>
        </div>

      </main>
    </div>
  )
}