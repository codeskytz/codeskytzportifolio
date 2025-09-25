"use client"
import { useState } from 'react'
import Link from 'next/link'

export default function Navbar(){
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-white/60 backdrop-blur dark:bg-primary/80 border-b border-slate-200 dark:border-slate-700">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 font-bold text-lg">
          <div className="w-9 h-9 rounded flex items-center justify-center bg-cyan text-primary">CS</div>
          Codesky
        </Link>

        <nav className="hidden md:flex gap-6 items-center">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/reviews">Reviews</Link>
          <Link href="/founders">Founders</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button aria-label="Toggle menu" onClick={() => setOpen(!open)} className="p-2 rounded-md border">
            {open ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="md:hidden bg-white/90 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800">
          <div className="px-4 py-4 flex flex-col gap-3">
            <Link href="/" onClick={() => setOpen(false)} className="block">Home</Link>
            <Link href="/about" onClick={() => setOpen(false)} className="block">About</Link>
            <Link href="/services" onClick={() => setOpen(false)} className="block">Services</Link>
            <Link href="/portfolio" onClick={() => setOpen(false)} className="block">Portfolio</Link>
            <Link href="/reviews" onClick={() => setOpen(false)} className="block">Reviews</Link>
            <Link href="/founders" onClick={() => setOpen(false)} className="block">Founders</Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="block">Contact</Link>
          </div>
        </div>
      )}
    </header>
  )
}
