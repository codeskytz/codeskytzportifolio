"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'

async function fetchJSON(path){
  const r = await fetch(path)
  if(!r.ok) return []
  const j = await r.json()
  // API responses may be array or { data: [] }
  return j?.data || j || []
}

export default function AdminDashboard(){
  const [authed, setAuthed] = useState(false)
  const [projects, setProjects] = useState([])
  const [founders, setFounders] = useState([])
  const [comments, setComments] = useState([])
  const [ads, setAds] = useState([])
  const [newAdUrl, setNewAdUrl] = useState('')
  const [newAdAlt, setNewAdAlt] = useState('')

  useEffect(()=>{
    try{ setAuthed(sessionStorage.getItem('codesky_admin') === '1') }catch(e){ setAuthed(false) }
  },[])

  useEffect(()=>{
    if(!authed) return
    fetchJSON('/api/projects').then(setProjects)
    fetchJSON('/api/founders').then(setFounders)
    fetchJSON('/api/comments').then(setComments)
  fetchJSON('/api/ads').then(setAds)
    // poll comments every 10s so newly submitted reviews appear
    const iv = setInterval(()=>fetchJSON('/api/comments').then(setComments), 10000)
    return ()=>clearInterval(iv)
  },[authed])

  if(!authed) return (
    <div className="p-8">
      <p className="text-red-600">Access denied. Please <Link href="/admin">login</Link>.</p>
    </div>
  )

  async function deleteProject(id){
    if(!confirm('Delete project?')) return
    const res = await fetch('/api/projects/'+id, { method: 'DELETE' })
    if(!res.ok) return alert('Failed to delete')
    setProjects(p=>p.filter(x=>x.id!==id))
  }

  async function deleteComment(id){
    if(!confirm('Delete comment?')) return
    const res = await fetch('/api/comments/'+id, { method: 'DELETE' })
    if(!res.ok) return alert('Failed to delete comment')
    setComments(c=>c.filter(x=>x.id!==id))
  }

  async function deleteFounder(id){
    if(!confirm('Delete founder?')) return
    const res = await fetch('/api/founders/'+id, { method: 'DELETE' })
    if(!res.ok) return alert('Failed to delete founder')
    setFounders(f=>f.filter(x=>x.id!==id))
  }

  async function createAd(){
    if(!newAdUrl) return alert('Provide image URL')
    try{
      const res = await fetch('/api/ads', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ url: newAdUrl, alt: newAdAlt }) })
      if(!res.ok) throw new Error('create failed')
      const j = await res.json()
      setAds(a=>[j.data, ...a])
      setNewAdUrl('')
      setNewAdAlt('')
    }catch(e){ console.error(e); alert('Failed to create ad') }
  }

  async function deleteAd(id){
    if(!confirm('Delete ad?')) return
    const res = await fetch('/api/ads/'+id, { method: 'DELETE' })
    if(!res.ok) return alert('Failed to delete ad')
    setAds(a=>a.filter(x=>x.id!==id))
  }

  return (
    <section className="p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-sm text-gray-600 mt-2">Quick overview of the site</p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded bg-white dark:bg-slate-900 shadow">
            <h3 className="font-semibold">Projects</h3>
            <p className="text-2xl mt-2">{projects.length}</p>
          </div>
          <div className="p-4 rounded bg-white dark:bg-slate-900 shadow">
            <h3 className="font-semibold">Contributors</h3>
            <p className="text-2xl mt-2">{founders.length}</p>
          </div>
          <div className="p-4 rounded bg-white dark:bg-slate-900 shadow">
            <h3 className="font-semibold">Comments</h3>
            <p className="text-2xl mt-2">{comments.length}</p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold">Recent Projects</h3>
          <ul className="mt-3 space-y-2">
            {projects.map(p=> (
              <li key={p.id} className="p-3 border rounded flex items-center justify-between">
                <div>
                  <div className="font-semibold">{p.title}</div>
                  <div className="text-sm text-gray-500">{p.summary}</div>
                </div>
                <div className="flex gap-2">
                  <Link href={`/portfolio/${p.id}`} className="px-3 py-1 rounded border">View</Link>
                  <Link href={`/admin/new?id=${p.id}`} className="px-3 py-1 rounded border">Edit</Link>
                  <button onClick={()=>deleteProject(p.id)} className="px-3 py-1 rounded bg-red-600 text-white">Delete</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <Link href="/admin/new" className="inline-block px-4 py-2 rounded bg-green-600 text-white">Add Project</Link>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="font-semibold">Comments</h3>
          <ul className="mt-3 space-y-2">
            {comments.map(c=> (
              <li key={c.id} className="p-3 border rounded">
                <div className="flex justify-between">
                  <div>
                    <div className="font-semibold">{c.name} <span className="text-sm text-gray-500">({c.email})</span></div>
                    <div className="text-sm text-gray-500">{c.comment}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm text-gray-400">{c.rating || 0}★</div>
                    <button onClick={()=>deleteComment(c.id)} className="px-3 py-1 rounded bg-red-600 text-white">Delete</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <h3 className="font-semibold">Founders</h3>
          <div className="mt-3">
            <Link href="/admin/founders/new" className="inline-block px-4 py-2 rounded bg-green-600 text-white">Add Founder</Link>
          </div>
          <ul className="mt-3 space-y-2">
            {founders.map(f=> (
              <li key={f.id} className="p-3 border rounded flex items-center justify-between">
                <div>
                  <div className="font-semibold">{f.name}</div>
                  <div className="text-sm text-gray-500">{f.position}</div>
                </div>
                <div className="flex gap-2">
                  <Link href={`/founders/${f.id}`} className="px-3 py-1 rounded border">View</Link>
                  <Link href={`/admin/founders/edit?id=${f.id}`} className="px-3 py-1 rounded border">Edit</Link>
                  <button onClick={()=>deleteFounder(f.id)} className="px-3 py-1 rounded bg-red-600 text-white">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-8">
          <h3 className="font-semibold">Ads</h3>
          <div className="mt-3 p-4 border rounded bg-white dark:bg-slate-900">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input value={newAdUrl} onChange={e=>setNewAdUrl(e.target.value)} placeholder="Image URL" className="px-3 py-2 border rounded col-span-2" />
              <input value={newAdAlt} onChange={e=>setNewAdAlt(e.target.value)} placeholder="Alt text" className="px-3 py-2 border rounded" />
            </div>
            <div className="mt-2">
              <button onClick={createAd} className="px-4 py-2 rounded bg-green-600 text-white fast-action">Add Ad</button>
            </div>

            <ul className="mt-3 space-y-2">
              {ads.map(a=> (
                <li key={a.id} className="p-2 border rounded flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={a.url} alt={a.alt} className="w-28 h-12 object-cover rounded" />
                    <div>
                      <div className="font-semibold">{a.alt||'Ad'}</div>
                      <div className="text-sm text-gray-500">{a.url}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={()=>deleteAd(a.id)} className="px-3 py-1 rounded bg-red-600 text-white fast-action">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
