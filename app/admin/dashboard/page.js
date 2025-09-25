"use client"
import { useEffect, useState } from 'react'
import projects from '../../../data/portfolio.json'
import founders from '../../../data/founders.json'
import comments from '../../../data/comments.json'
import Link from 'next/link'

export default function AdminDashboard(){
  const [authed, setAuthed] = useState(false)

  useEffect(()=>{
    try{ setAuthed(sessionStorage.getItem('codesky_admin') === '1') }catch(e){ setAuthed(false) }
  },[])

  if(!authed) return (
    <div className="p-8">
      <p className="text-red-600">Access denied. Please <Link href="/admin">login</Link>.</p>
    </div>
  )

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
                  {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="px-3 py-1 rounded bg-cyan text-white">Open</a>}
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <Link href="/admin/new" className="inline-block px-4 py-2 rounded bg-green-600 text-white">Add Project</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
