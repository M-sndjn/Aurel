import {Link,} from 'react-router-dom'

function Footer() {
  return (
    <footer className="border-t border-white/15 bg-black px-6 py-8 text-white md:px-12">
      <div className="mx-auto max-w-[1600px]">
        {/* Main Footer */}
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          {/* Brand */}
          <Link
            to="/"
            className="font-display text-2xl tracking-[0.25em]"
          >
            AUREL
          </Link>

          {/* Navigation */}
          <nav className="flex flex-wrap gap-6 text-sm text-white/75">
            <Link to="/discover" className="transition hover:text-white">
              Discover
            </Link>
            <Link to="/about" className="transition hover:text-white">
              About
            </Link>

          </nav>

          {/* Social Links */}
          <div className="flex gap-5 text-sm text-white/75">
            <Link to="#" aria-label="Instagram" className="transition hover:text-white">
              Instagram
            </Link>
            <Link to="#" aria-label="Facebook" className="transition hover:text-white">
              Facebook
            </Link>
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