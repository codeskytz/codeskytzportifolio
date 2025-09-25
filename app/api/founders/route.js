import { promises as fs } from 'fs'
import path from 'path'

const dataPath = path.join(process.cwd(), 'data', 'founders.json')

async function readData(){
  try{ const raw = await fs.readFile(dataPath,'utf-8'); return JSON.parse(raw||'[]') }catch(e){ return [] }
}

export async function GET(){
  const arr = await readData()
  return new Response(JSON.stringify(arr), { status: 200 })
}

export async function POST(req){
  try{
    const body = await req.json()
    const arr = await readData()
    const id = body.id || `f${Date.now()}`
    const entry = { id, name: body.name||'Unnamed', position: body.position||'', story: body.story||'', image: body.image||'' }
    arr.push(entry)
    await fs.writeFile(dataPath, JSON.stringify(arr, null, 2), 'utf-8')
    return new Response(JSON.stringify(entry), { status: 201 })
  }catch(e){
    return new Response(JSON.stringify({ error: String(e) }), { status: 500 })
  }
}
