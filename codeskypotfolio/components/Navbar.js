"use client"
export default function Navbar(){
  return (
    <header className="sticky top-0 z-40 bg-white/60 backdrop-blur dark:bg-primary/80 border-b border-slate-200 dark:border-slate-700">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 font-bold text-lg">
          <div className="w-9 h-9 rounded flex items-center justify-center bg-cyan text-primary">CS</div>
          Codesky
        </a>
        <nav className="hidden md:flex gap-6 items-center">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#reviews">Reviews</a>
          <a href="#founders">Founders</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  )
}
