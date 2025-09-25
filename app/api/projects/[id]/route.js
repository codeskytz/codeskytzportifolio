import { promises as fs } from 'fs'
import path from 'path'

const dataPath = path.join(process.cwd(), 'data', 'portfolio.json')

async function readData(){
  try{ const raw = await fs.readFile(dataPath,'utf-8'); return JSON.parse(raw||'[]') }catch(e){ return [] }
}

export async function GET(req, { params }){
  try{
    const id = params.id
    const arr = await readData()
    const item = arr.find(p=>p.id === id)
    if(!item) return new Response(JSON.stringify({ error: 'not found' }), { status: 404 })
    return new Response(JSON.stringify(item), { status: 200 })
  }catch(e){
    return new Response(JSON.stringify({ error: String(e) }), { status: 500 })
  }
}

export async function PUT(req, { params }){
  try{
    const id = params.id
    const body = await req.json()
    const arr = await readData()
    const idx = arr.findIndex(p=>p.id === id)
    if(idx === -1) return new Response(JSON.stringify({ error: 'not found' }), { status: 404 })
    const updated = { ...arr[idx], ...body }
    arr[idx] = updated
    await fs.writeFile(dataPath, JSON.stringify(arr, null, 2), 'utf-8')
    return new Response(JSON.stringify(updated), { status: 200 })
  }catch(e){
    return new Response(JSON.stringify({ error: String(e) }), { status: 500 })
  }
}

export async function DELETE(req, { params }){
  try{
    const id = params.id
    const arr = await readData()
    const idx = arr.findIndex(p=>p.id === id)
    if(idx === -1) return new Response(JSON.stringify({ error: 'not found' }), { status: 404 })
    const removed = arr.splice(idx,1)[0]
    await fs.writeFile(dataPath, JSON.stringify(arr, null, 2), 'utf-8')
    return new Response(JSON.stringify({ ok: true, removed }), { status: 200 })
  }catch(e){
    return new Response(JSON.stringify({ error: String(e) }), { status: 500 })
  }
}
