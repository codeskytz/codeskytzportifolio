import founders from '../../data/founders.json'

export default function Founders(){
  return (
    <section id="founders" className="py-12">
      <h2 className="text-2xl font-semibold mb-4">Founders</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {founders.map(f=> (
          <div key={f.id} className="border p-4 rounded bg-white dark:bg-slate-900">
            <img src={f.image} alt={f.name} className="w-24 h-24 rounded-full mb-2" />
            <h3 className="font-bold">{f.name}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">{f.role}</p>
            <p className="mt-2 text-sm">{f.bio}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
