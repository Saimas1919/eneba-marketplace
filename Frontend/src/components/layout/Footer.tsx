export default function Footer() {
  return (
    <footer className="w-full bg-[#0b0914] text-white font-sans">
      
      {/* TOP PAYMENT BAR */}
      <div className="w-full bg-white py-4 px-6 flex items-center justify-center gap-6 md:gap-10 border-b border-gray-200 overflow-x-auto">
        <span className="text-[#5c3fd1] font-extrabold text-lg tracking-tighter shrink-0">eneba <span className="text-[10px] text-gray-500 font-normal block leading-none">wallet</span></span>
        <span className="text-[#003087] font-extrabold text-lg italic tracking-tighter shrink-0">PayPal</span>
        <span className="text-[#003087] font-bold text-sm shrink-0">Pay Later</span>
        <span className="text-black font-bold text-sm shrink-0"> Pay</span>
        <span className="text-gray-600 font-bold text-sm shrink-0">G Pay</span>
        <span className="text-[#1a1f71] font-extrabold text-lg italic tracking-tighter shrink-0">VISA</span>
        <div className="flex shrink-0">
          <div className="w-6 h-6 rounded-full bg-red-500 opacity-80"></div>
          <div className="w-6 h-6 rounded-full bg-yellow-500 opacity-80 -ml-2"></div>
        </div>
        <span className="text-[#002663] font-bold text-sm shrink-0">AMEX</span>
        <span className="text-[#0079c1] font-bold text-lg shrink-0">venmo</span>
        <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs shrink-0">$</span>
      </div>

      {/* MAIN FOOTER CONTENT */}
      <div className="max-w-[1440px] mx-auto px-6 py-16">
        
        {/* LINKS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 mb-16">
          
          {/* Column 1 */}
          <div>
            <h3 className="text-[13px] font-bold mb-4">About Eneba</h3>
            <ul className="space-y-2 text-[12px] text-gray-400">
              <li><a href="#" className="hover:text-[#FFCC00] transition-colors">About us</a></li>
              <li><a href="#" className="hover:text-[#FFCC00] transition-colors">Contact us</a></li>
              <li><a href="#" className="hover:text-[#FFCC00] transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-[#FFCC00] transition-colors">Eneba Trust & Transparency</a></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-[13px] font-bold mb-4">Buy</h3>
            <ul className="space-y-2 text-[12px] text-gray-400">
              <li><a href="#" className="hover:text-[#FFCC00] transition-colors">How to buy</a></li>
              <li><a href="#" className="hover:text-[#FFCC00] transition-colors">Collections</a></li>
              <li><a href="#" className="hover:text-[#FFCC00] transition-colors">Loyalty program</a></li>
              <li><a href="#" className="hover:text-[#FFCC00] transition-colors">Discounts</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-[13px] font-bold mb-4">Help</h3>
            <ul className="space-y-2 text-[12px] text-gray-400">
              <li><a href="#" className="hover:text-[#FFCC00] transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-[#FFCC00] transition-colors">How to activate game</a></li>
              <li><a href="#" className="hover:text-[#FFCC00] transition-colors">Create a ticket</a></li>
              <li><a href="#" className="hover:text-[#FFCC00] transition-colors">Return policy</a></li>
              <li><a href="#" className="hover:text-[#FFCC00] transition-colors">Content reporting</a></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-[13px] font-bold mb-4">Community</h3>
            <ul className="space-y-2 text-[12px] text-gray-400">
              <li><a href="#" className="hover:text-[#FFCC00] transition-colors">Gaming news</a></li>
              <li><a href="#" className="hover:text-[#FFCC00] transition-colors">Giveaways</a></li>
              <li><a href="#" className="hover:text-[#FFCC00] transition-colors">Become affiliate</a></li>
              <li><a href="#" className="hover:text-[#FFCC00] transition-colors">Snakzy, Play and Earn</a></li>
            </ul>
          </div>

          {/* Column 5 */}
          <div>
            <h3 className="text-[13px] font-bold mb-4">Business</h3>
            <ul className="space-y-2 text-[12px] text-gray-400">
              <li><a href="#" className="hover:text-[#FFCC00] transition-colors">Sell on Eneba</a></li>
              <li><a href="#" className="hover:text-[#FFCC00] transition-colors">Advertise with Us</a></li>
            </ul>
          </div>

          {/* Column 6: Follow Us */}
          <div>
            <h3 className="text-[13px] font-bold mb-4">Follow us</h3>
            <div className="flex gap-3 mb-6">
              
              {/* Facebook SVG */}
              <a href="#" className="text-white hover:text-[#FFCC00] transition-colors">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              
              {/* X SVG */}
              <a href="#" className="text-white hover:text-[#FFCC00] transition-colors">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>

              {/* Instagram SVG */}
              <a href="#" className="text-white hover:text-[#FFCC00] transition-colors">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>

              {/* YouTube SVG */}
              <a href="#" className="text-white hover:text-[#FFCC00] transition-colors">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>

              {/* Discord SVG */}
              <a href="#" className="text-white hover:text-[#FFCC00] transition-colors">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/></svg>
              </a>

            </div>
            <div className="flex flex-col gap-2">
              <div className="bg-[#ff4a4a] text-white text-[10px] font-bold px-2 py-1 inline-block w-max">PC EDITOR'S CHOICE</div>
              <div className="bg-black text-green-500 text-[10px] font-extrabold px-2 py-1 border border-green-500 inline-block w-max">MONSTER ENERGY</div>
            </div>
          </div>

          {/* Column 7: Download App */}
          <div>
            <h3 className="text-[13px] font-bold mb-4">Download the App</h3>
            <div className="flex flex-col gap-2">
              <a href="#" className="bg-black border border-white/20 rounded-md px-3 py-1.5 flex items-center gap-2 hover:bg-white/10 transition-colors w-max">
                <span className="text-xs font-bold leading-tight">GET IT ON<br/><span className="text-sm">Google Play</span></span>
              </a>
              <a href="#" className="bg-black border border-white/20 rounded-md px-3 py-1.5 flex items-center gap-2 hover:bg-white/10 transition-colors w-max">
                <span className="text-xs font-bold leading-tight">Download on the<br/><span className="text-sm">App Store</span></span>
              </a>
            </div>
          </div>

          {/* Column 8: Trustpilot */}
          <div>
            <h3 className="text-[13px] font-bold mb-4">See our reviews on</h3>
            <div className="flex items-center gap-1 mb-2">
              <span className="text-green-500 text-lg">★</span>
              <span className="font-bold text-sm">Trustpilot</span>
            </div>
            <div className="flex gap-1 mb-1">
              {[1, 2, 3, 4].map(i => <div key={i} className="bg-green-500 w-6 h-6 flex items-center justify-center text-xs">★</div>)}
              <div className="bg-green-500 w-6 h-6 flex items-center justify-center text-xs opacity-50">★</div>
            </div>
            <p className="text-[10px] text-gray-400">TrustScore <span className="text-white font-bold">4.4</span> <span className="underline cursor-pointer">333,080 reviews</span></p>
          </div>
        </div>

        {/* NEWSLETTER & LANGUAGE */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-t border-white/10 pt-10 mb-10">
          
          <div className="w-full max-w-md">
            <h3 className="text-[13px] font-bold mb-3">Get personalized game deals</h3>
            <div className="flex w-full mb-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 bg-transparent border border-white/30 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 outline-none focus:border-[#FFCC00] transition-colors"
              />
              <button className="bg-white text-black font-bold text-sm px-6 py-2.5 hover:bg-[#FFCC00] transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-[11px] text-gray-500">
              You can unsubscribe at any time. Visit <a href="#" className="underline hover:text-white">Privacy notice</a> for more information
            </p>
          </div>

          <div>
            <button className="flex items-center gap-2 border border-white/30 px-4 py-2 hover:bg-white/10 transition-colors">
              <span className="text-lg">🇪🇺</span>
              <span className="text-[13px] font-bold">English EU | EUR</span>
            </button>
          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="text-[11px] text-gray-500 text-center md:text-left leading-relaxed">
          Copyright © 2026 Eneba. All Rights Reserved. JSC “Helis play”, Gyneju St. 4-333, Vilnius, the Republic of Lithuania. 
          <a href="#" className="underline hover:text-white ml-1">Terms and Conditions</a>, 
          <a href="#" className="underline hover:text-white ml-1">Privacy notice</a>, 
          <a href="#" className="underline hover:text-white ml-1">Cookie preferences</a>.
        </div>

      </div>
    </footer>
  )
}