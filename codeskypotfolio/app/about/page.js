export default function About(){
  return (
    <section id="about" className="py-12">
      <h2 className="text-2xl font-semibold">About</h2>
      <div className="grid md:grid-cols-2 gap-6 mt-4">
        <div>
          <p>Codesky is a modern engineering studio focused on web, AI, and security.</p>
        </div>
        <div>
          <div className="grid grid-cols-1 gap-3">
            <div className="p-4 border rounded">Mission: Build reliable software with innovation.</div>
            <div className="p-4 border rounded">Vision: Democratize powerful software.</div>
          </div>
        </div>
      </div>
    </section>
  )
}
