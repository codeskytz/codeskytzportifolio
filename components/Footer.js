export default function Footer(){
  return (
    <footer className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-primary">
      <div className="container mx-auto px-4 py-8 text-sm">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">© {new Date().getFullYear()} Codesky. All rights reserved.</div>
          <div className="flex gap-4 text-sm">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
