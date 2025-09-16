export default function Hero(){
  return (
    <section id="home" className="py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold">Innovation With No Limit</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">We build secure, performant web apps, AI integrations, and automation systems that scale.</p>
          <div className="mt-6 flex gap-3">
            <a href="#portfolio" className="px-4 py-2 rounded bg-cyan text-primary font-semibold">View Work</a>
            <a href="#contact" className="px-4 py-2 rounded border">Contact</a>
          </div>
        </div>
        <div>
          <div className="h-64 bg-gradient-to-tr from-primary to-cyan rounded-lg shadow-lg" />
        </div>
      </div>
    </section>
  )
}
