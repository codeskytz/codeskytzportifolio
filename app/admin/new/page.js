"use client"
import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

export default function NewProject(){
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [techs, setTechs] = useState(['React','Next.js','Tailwind'])
  const [selectedTechs, setSelectedTechs] = useState([])
  // frontImageBase64 / frontFile used for preview + robust upload
  const [frontImage, setFrontImage] = useState(null)
  const [frontFile, setFrontFile] = useState(null)
  const [images, setImages] = useState([])
  const [imageFiles, setImageFiles] = useState([])
  const [live, setLive] = useState('')
  const [loading, setLoading] = useState(false)
    // Prefer public env var, otherwise fallback to NEXT_IMGBB_API
    // If the environment isn't wired up correctly during runtime, we'll also
    // accept a hardcoded fallback. Warning: embedding keys in client code is
    // insecure for production; this is only per your request for quick testing.
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API || process.env.NEXT_IMGBB_API || '8a402848056a5c86e392b765263065e0'
  const [errorMsg, setErrorMsg] = useState('')
  const params = useSearchParams()
  const router = useRouter()
  const editId = params.get('id')

  useEffect(()=>{
    if(!editId) return
    // load project for edit
    fetch('/api/projects/'+editId).then(r=>r.json()).then(j=>{
      setTitle(j.title||'')
      setSummary(j.summary||'')
      setSelectedTechs(j.tags||j.techs||[])
      setLive(j.live||'')
      if(j.front) setFrontImage(j.front)
      if(j.gallery) setImages(j.gallery)
    }).catch(()=>{})
  },[editId])

  function toggleTech(t){
    setSelectedTechs(s => s.includes(t)? s.filter(x=>x!==t): [...s,t])
  }

  async function uploadToImgbb(base64){
    if(!apiKey){
      throw new Error('IMGBB API key not configured. Set NEXT_PUBLIC_IMGBB_API in your environment.')
    }
    const form = new FormData()
    form.append('key', apiKey)

    // If caller passed a File, send it directly (more robust). Otherwise expect base64 string.
    if(base64 && typeof base64 === 'object' && base64 instanceof File) {
      form.append('image', base64)
    } else if(base64 && typeof base64 === 'string') {
      // Some files may produce data URIs with different mime strings
      // Remove any data:<mime>;base64, prefix and whitespace/newlines
      const cleaned = String(base64).replace(/^data:.*;base64,/, '').replace(/\s+/g, '')

      // basic validation: must be base64-like
      const maybeBase64 = /^[A-Za-z0-9+/]+=*$/.test(cleaned)
      if(!maybeBase64) {
        // throw but allow caller to try file-based upload instead
        throw new Error('Invalid base64 data for image. Consider using a direct file upload.')
      }

      form.append('image', cleaned)
    } else {
      throw new Error("Can't get target upload source info")
    }

    const res = await fetch('https://api.imgbb.com/1/upload', { method:'POST', body: form })
    let json
    try{
      json = await res.json()
    }catch(e){
      throw new Error('Invalid response from imgbb')
    }

    // imgbb returns { data: { url: '...' }, success: true }
    if(!res.ok || !json || !json.data || !json.data.url){
      // Include the full response in the error for easier debugging in dev
      const msg = json?.error?.message || json?.status_message || JSON.stringify(json) || 'Upload failed'
      throw new Error(msg)
    }

    return json.data.url
  }

  async function submit(e){
    e.preventDefault()
    if(!title) return alert('Title required')
    setLoading(true)
    setErrorMsg('')
    try{
      // prefer file uploads when available (more robust). Try file then fallback to base64.
      let frontUrl = ''
      if(frontFile) {
        try{ frontUrl = await uploadToImgbb(frontFile) }catch(e){
          // fallback to base64 attempt if we have it
          if(frontImage) frontUrl = await uploadToImgbb(frontImage)
          else throw e
        }
      } else if(frontImage) {
        frontUrl = await uploadToImgbb(frontImage)
      }

      const gallery = []
      const total = Math.max(images.length, imageFiles.length)
      for(let i=0;i<total;i++){
        const imgBase64 = images[i]
        const imgFile = imageFiles[i]
        if(imgFile){
          // try file upload
          try{ gallery.push(await uploadToImgbb(imgFile)); continue }catch(e){
            // if file upload fails, try base64 if available
            if(imgBase64){
              gallery.push(await uploadToImgbb(imgBase64)); continue
            }
            throw e
          }
        }

        if(imgBase64){
          // try base64 upload
          try{ gallery.push(await uploadToImgbb(imgBase64)); continue }catch(e){
            // if base64 fails and no file to fallback to, report which index failed
            throw new Error(`Failed to upload gallery image #${i+1}: ${e?.message||e}`)
          }
        }

        // neither file nor base64 present for this index; skip gracefully
        console.warn(`Skipping gallery index ${i} - no file or base64 data available`)
      }

      // Save metadata to server API which persists to data/portfolio.json
      const payload = { title, summary, techs: selectedTechs, front: frontUrl, gallery, live }
      let res
      if(editId){
        res = await fetch('/api/projects/'+editId, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      } else {
        res = await fetch('/api/projects', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      }
      if(!res.ok) throw new Error('Failed to save project')
      const created = await res.json()
      alert(editId ? 'Project updated' : 'Project created: ' + (created.id || created.title || 'ok'))
  setTitle('')
  setSummary('')
  setSelectedTechs([])
  setFrontImage(null)
  setImages([])
  setLive('')
  if(editId) router.push('/admin')
    }catch(err){
      console.error(err)
      const m = err?.message || String(err)
      setErrorMsg(m)
      alert('Failed: ' + m)
    }finally{ setLoading(false) }
  }

  function toBase64(file){
    return new Promise((res, rej)=>{
      const fr = new FileReader()
      fr.onload = ()=>res(fr.result)
      fr.onerror = rej
      fr.readAsDataURL(file)
    })
  }

  async function handleFront(e){
    const f = e.target.files[0]
    if(!f) return
    const b = await toBase64(f)
    setFrontImage(b)
    setFrontFile(f)
  }

  async function handleGallery(e){
    const files = Array.from(e.target.files)
    const arr = []
    for(const f of files){ arr.push(await toBase64(f)) }
    setImages(arr)
    setImageFiles(files)
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold">Create Project</h2>
      <form onSubmit={submit} className="mt-4 space-y-4">
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
        <textarea value={summary} onChange={e=>setSummary(e.target.value)} placeholder="Short summary" className="w-full p-2 border rounded" />

        <div>
          <div className="text-sm font-semibold mb-2">Techs (click to toggle)</div>
          <div className="flex gap-2 flex-wrap">
            {techs.map(t=> (
              <button type="button" key={t} onClick={()=>toggleTech(t)} className={`px-3 py-1 rounded ${selectedTechs.includes(t)? 'bg-indigo-600 text-white':'bg-gray-100'}`}>{t}</button>
            ))}
            <input placeholder="Add tech" onKeyDown={(e)=>{ if(e.key==='Enter'){ e.preventDefault(); setTechs(s=>[...s,e.target.value]); e.target.value=''} }} className="px-3 py-1 border rounded" />
          </div>
        </div>

        <div>
          <label className="block text-sm">Front image</label>
          <input type="file" accept="image/*" onChange={handleFront} />
        </div>

        <div>
          <label className="block text-sm">Gallery images</label>
          <input type="file" accept="image/*" multiple onChange={handleGallery} />
        </div>

        <input value={live} onChange={e=>setLive(e.target.value)} placeholder="Live URL" className="w-full p-2 border rounded" />

        <div className="flex justify-end">
          <button type="submit" disabled={loading} className="px-4 py-2 rounded bg-indigo-600 text-white">{loading? 'Uploading...':'Create'}</button>
        </div>
      </form>
    </div>
  )
}
