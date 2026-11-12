import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Globe, Circle, CheckCircle2 } from 'lucide-react'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [receiveOffers, setReceiveOffers] = useState(false)

  const hasMinLength = password.length >= 8
  const hasNumberOrSpecial = /[0-9!@#$%^&*(),.?":{}|<>]/.test(password)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Register:', { email, password, receiveOffers })
  }

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-[#1f0a4e] text-white font-sans">
      
      {/* HEADER (Logo Only) */}
      <header className="px-10 py-6 shrink-0">
        <Link to="/">
          <img src="/logo.png" alt="Eneba" className="h-8 w-auto object-contain" />
        </Link>
      </header>

      {/* MAIN CONTENT - Wide container to push panel right */}
      <main className="flex-1 flex items-center justify-center px-10 overflow-hidden">
        <div className="max-w-[1500px] w-full flex flex-row items-center justify-between gap-12 h-full">
          
          {/* LEFT SIDE: TEXT */}
          <div className="flex-1 text-left max-w-[600px]">
            <h1 className="text-5xl md:text-6xl lg:text-[70px] xl:text-[80px] font-extrabold tracking-tight leading-[1.1] mb-6 whitespace-nowrap">
            Hi!<br />
            It's nice to see you!
            </h1>
          </div>

          {/* RIGHT SIDE: CREATE ACCOUNT PANEL (Taller, wider, sharp corners) */}
          <div className="w-[420px] bg-[#4618ac] p-8 shadow-2xl shrink-0">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-1">Create account</h2>
              <p className="text-sm text-white/70">
                Already have an account? <Link to="/login" className="text-[#FFCC00] hover:underline">Login</Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              
              {/* INPUTS - Increased height */}
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#310c7a] border border-transparent focus:border-[#FFCC00] h-12 px-4 text-sm text-white placeholder:text-white/50 outline-none transition-colors"
              />
              
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#310c7a] border border-transparent focus:border-[#FFCC00] h-12 px-4 text-sm text-white placeholder:text-white/50 outline-none transition-colors"
              />
              
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Repeat password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full bg-[#310c7a] border border-transparent focus:border-[#FFCC00] h-12 px-4 text-sm text-white placeholder:text-white/50 outline-none transition-colors"
              />

              {/* SHOW PASSWORD TOGGLE */}
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="text-[#FFCC00] text-[13px] font-medium text-left hover:underline mt-1"
              >
                Show password
              </button>

              {/* PASSWORD VALIDATION */}
              <div className="flex flex-col gap-1.5 mt-2 mb-2">
                <div className={`flex items-center gap-2 text-[12px] ${hasMinLength ? 'text-[#4ade80]' : 'text-white/60'}`}>
                  {hasMinLength ? <CheckCircle2 size={14} /> : <Circle size={14} />}
                  <span>At least 8 characters</span>
                </div>
                <div className={`flex items-center gap-2 text-[12px] ${hasNumberOrSpecial ? 'text-[#4ade80]' : 'text-white/60'}`}>
                  {hasNumberOrSpecial ? <CheckCircle2 size={14} /> : <Circle size={14} />}
                  <span>At least one number (0-9) or special symbol</span>
                </div>
              </div>

              {/* MARKETING CHECKBOX */}
              <label className="flex items-start gap-3 cursor-pointer group mb-4">
                <div className="relative flex items-center justify-center mt-0.5">
                  <input 
                    type="checkbox" 
                    checked={receiveOffers}
                    onChange={(e) => setReceiveOffers(e.target.checked)}
                    className="peer sr-only"
                  />
                  <div className="w-5 h-5 border border-white/40 peer-checked:bg-[#FFCC00] peer-checked:border-[#FFCC00] transition-colors flex items-center justify-center shrink-0">
                    <svg className={`w-3.5 h-3.5 text-black ${receiveOffers ? 'block' : 'hidden'}`} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <span className="text-[12px] text-white/80 leading-tight group-hover:text-white transition-colors">
                  I want to receive custom personalized offers for the very best game deals
                </span>
              </label>

              {/* SUBMIT BUTTON */}
              <button 
                type="submit" 
                className="w-full bg-[#FFCC00] hover:bg-[#ffdc4d] text-black font-bold text-sm h-12 transition-colors"
              >
                Create account
              </button>
            </form>

            {/* DIVIDER */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-white/10"></div>
              <span className="text-xs text-white/50 lowercase">or</span>
              <div className="flex-1 h-px bg-white/10"></div>
            </div>

            {/* SOCIAL LOGIN BUTTONS (Row) */}
            <div className="flex gap-2 mb-4">
              <button className="flex-1 bg-white text-black font-bold text-[13px] h-11 flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Google
              </button>
              <button className="flex-1 bg-[#4267B2] text-white font-bold text-[13px] h-11 flex items-center justify-center gap-2 hover:bg-[#365899] transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Facebook
              </button>
              <button className="flex-1 bg-black text-white font-bold text-[13px] h-11 flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.03 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.56-1.702"/></svg>
                Apple
              </button>
            </div>

            {/* OTHER SOCIAL ICONS */}
            <div className="flex items-center justify-between gap-4 py-2.5 px-6 border border-white/20 mb-5 text-white/70">
              <button className="hover:text-white transition-colors"><svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/></svg></button>
              <button className="hover:text-white transition-colors"><svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/></svg></button>
              <button className="hover:text-white transition-colors"><svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.41 2.87 8.16 6.84 9.46.5.09.68-.22.68-.48v-1.7c-2.77.6-3.36-1.34-3.36-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85V21c0 .27.18.58.69.48A10.005 10.005 0 0022 12c0-5.52-4.48-10-10-10z"/></svg></button>
              <button className="hover:text-white transition-colors"><svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></button>
            </div>

            {/* LEGAL TEXT */}
            <p className="text-[11px] text-white/60 leading-relaxed font-medium">
              By creating account I confirm I am at least 16 and agree to Eneba <a href="#" className="text-[#4ade80] hover:underline">Terms and Conditions</a> and <a href="#" className="text-[#4ade80] hover:underline">Privacy Notice</a>.
            </p>

          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] text-white/60 font-medium px-6 shrink-0">
        <button className="flex items-center gap-1.5 hover:text-white transition-colors">
          <Globe size={14} /> English EU
        </button>
        <a href="#" className="hover:text-white transition-colors underline decoration-white/30 underline-offset-4">Terms & Conditions</a>
        <a href="#" className="hover:text-white transition-colors underline decoration-white/30 underline-offset-4">Privacy notice</a>
        <a href="#" className="hover:text-white transition-colors underline decoration-white/30 underline-offset-4">Cookie preferences</a>
        <a href="#" className="hover:text-white transition-colors underline decoration-white/30 underline-offset-4">Support</a>
        <span className="text-white/40">Copyright © 2026 Eneba. All Rights Reserved.</span>
      </footer>

    </div>
  )
}