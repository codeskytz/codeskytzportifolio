"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewFounder(){
  const router = useRouter()
  const [name, setName] = useState('')
  const [position, setPosition] = useState('')
  const [story, setStory] = useState('')
  const [image, setImage] = useState('')

  async function submit(e){
    e.preventDefault()
    const res = await fetch('/api/founders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, position, story, image }) })
    if(!res.ok) return alert('Failed')
    router.push('/admin')
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold">Add Founder</h2>
      <form onSubmit={submit} className="mt-4 space-y-4">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="w-full p-2 border rounded" />
        <input value={position} onChange={e=>setPosition(e.target.value)} placeholder="Position" className="w-full p-2 border rounded" />
        <input value={image} onChange={e=>setImage(e.target.value)} placeholder="Image URL" className="w-full p-2 border rounded" />
        <textarea value={story} onChange={e=>setStory(e.target.value)} placeholder="Short story" className="w-full p-2 border rounded" />
        <div className="flex justify-end">
          <button type="submit" className="px-4 py-2 rounded bg-indigo-600 text-white fast-action">Create</button>
        </div>
      </form>
    </div>
  )
}
