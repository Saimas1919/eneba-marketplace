import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Globe, Circle, CheckCircle2, Loader2 } from 'lucide-react'
import { api } from '../lib/api'
import { useAuth } from '../hooks/useAuth'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function Register() {
  useDocumentTitle("Create Account | Eneba");

  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [receiveOffers, setReceiveOffers] = useState(false)
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const hasMinLength = password.length >= 8
  const hasNumberOrSpecial = /[0-9!@#$%^&*(),.?":{}|<>]/.test(password)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) return setError("Passwords do not match")
    
    setLoading(true)
    setError(null)

    try {
      const res = await api.register({ email, password, receiveOffers })
      login(res.user, res.token)
      navigate('/')
    } catch (err: any) {
      setError(err.message || 'Registration failed')
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
          <div className="flex-1 text-left max-w-[600px]">
            <h1 className="text-5xl md:text-6xl lg:text-[70px] xl:text-[80px] font-extrabold tracking-tight leading-[1.1] mb-6 whitespace-nowrap">
              Hi!<br />It's nice to see you!
            </h1>
          </div>

          <div className="w-[420px] bg-[#4618ac] p-8 shadow-2xl shrink-0">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-1">Create account</h2>
              <p className="text-sm text-white/70">
                Already have an account? <Link to="/login" className="text-[#FFCC00] hover:underline">Login</Link>
              </p>
            </div>

            {error && <div className="bg-red-500/20 border border-red-500 text-red-100 text-sm px-4 py-2 mb-4">{error}</div>}

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-[#310c7a] border border-transparent focus:border-[#FFCC00] h-12 px-4 text-sm text-white outline-none" />
              <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full bg-[#310c7a] border border-transparent focus:border-[#FFCC00] h-12 px-4 text-sm text-white outline-none" />
              <input type={showPassword ? "text" : "password"} placeholder="Repeat password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="w-full bg-[#310c7a] border border-transparent focus:border-[#FFCC00] h-12 px-4 text-sm text-white outline-none" />

              <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-[#FFCC00] text-[13px] font-medium text-left hover:underline mt-1">
                {showPassword ? "Hide password" : "Show password"}
              </button>

              <div className="flex flex-col gap-1.5 mt-2 mb-2">
                <div className={`flex items-center gap-2 text-[12px] ${hasMinLength ? 'text-[#4ade80]' : 'text-white/60'}`}>
                  {hasMinLength ? <CheckCircle2 size={14} /> : <Circle size={14} />} <span>At least 8 characters</span>
                </div>
                <div className={`flex items-center gap-2 text-[12px] ${hasNumberOrSpecial ? 'text-[#4ade80]' : 'text-white/60'}`}>
                  {hasNumberOrSpecial ? <CheckCircle2 size={14} /> : <Circle size={14} />} <span>At least one number or special symbol</span>
                </div>
              </div>

              <label className="flex items-start gap-3 cursor-pointer group mb-4">
                <div className="relative flex items-center justify-center mt-0.5">
                  <input type="checkbox" checked={receiveOffers} onChange={(e) => setReceiveOffers(e.target.checked)} className="peer sr-only" />
                  <div className="w-5 h-5 border border-white/40 peer-checked:bg-[#FFCC00] peer-checked:border-[#FFCC00] flex items-center justify-center shrink-0">
                    <svg className={`w-3.5 h-3.5 text-black ${receiveOffers ? 'block' : 'hidden'}`} viewBox="0 0 14 14" fill="none"><path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
                <span className="text-[12px] text-white/80 leading-tight">I want to receive custom personalized offers for the very best game deals</span>
              </label>

              <button type="submit" disabled={loading} className="w-full bg-[#FFCC00] hover:bg-[#ffdc4d] text-black font-bold text-sm h-12 flex items-center justify-center">
                {loading ? <Loader2 size={20} className="animate-spin" /> : "Create account"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}