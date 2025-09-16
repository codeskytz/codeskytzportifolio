import comments from '../../data/comments.json'

export default function Reviews(){
  return (
    <section id="reviews" className="py-12">
      <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {comments.map(c=> (
          <div key={c.id} className="border p-4 rounded bg-white dark:bg-slate-900">
            <div className="font-bold">{c.name} <span className="text-sm">— {c.rating}★</span></div>
            <div className="text-sm text-slate-600 dark:text-slate-300">{c.comment}</div>
            <div className="text-xs mt-2 text-slate-400">{c.date}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
