function Footer() {
  return (
    <footer className="border-t border-white/15 bg-black px-6 py-8 text-white md:px-12">
      <div className="mx-auto max-w-[1600px]">
        {/* Main Footer */}
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          {/* Brand */}
          <a
            href="/"
            className="font-display text-2xl tracking-[0.25em]"
          >
            AUREL
          </a>

          {/* Navigation */}
          <nav className="flex flex-wrap gap-6 text-sm text-white/75">
            <a href="/discover" className="transition hover:text-white">
              Discover
            </a>
            <a href="/about" className="transition hover:text-white">
              About
            </a>
            <a href="/#contact" className="transition hover:text-white">
              Contact
            </a>
          </nav>

          {/* Social Links */}
          <div className="flex gap-5 text-sm text-white/75">
            <a href="#" aria-label="Instagram" className="transition hover:text-white">
              Instagram
            </a>
            <a href="#" aria-label="Facebook" className="transition hover:text-white">
              Facebook
            </a>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-8 flex flex-col gap-3 border-t border-white/15 pt-5 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} AUREL. All rights reserved.</p>

          <p className="tracking-[0.25em]">
            LIVE EXCEPTIONAL.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer