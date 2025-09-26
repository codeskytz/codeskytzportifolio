import founders from '../../data/founders.json'

export default function Founders(){
  return (
    <section id="founders" className="py-12">
      <h2 className="text-2xl font-semibold mb-4">Founders</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {founders.map(f=> {
          const name = f.name || f.fullName || 'Unnamed'
          const position = f.position || f.role || ''
          const story = f.story || f.bio || ''
          const img = f.image || f.imageUrl || '/images/placeholder.png'
          return (
            <div key={f.id} className="border p-4 rounded bg-white dark:bg-slate-900">
              <img src={img} alt={name} className="w-24 h-24 rounded-full mb-2 object-cover" />
              <h3 className="font-bold">{name}</h3>
              {position && <p className="text-sm text-slate-600 dark:text-slate-300">{position}</p>}
              {story && <p className="mt-2 text-sm">{story}</p>}
            </div>
          )
        })}
      </div>
    </section>
  )
}
