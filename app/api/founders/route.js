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
    // Normalize commonly used fields so frontend can read either shape
    const name = body.name || body.fullName || 'Unnamed'
    const position = body.position || body.role || ''
    const story = body.story || body.bio || ''
    const image = body.image || body.imageUrl || ''
    const entry = { id, name, position, role: position, story, bio: story, image }
    arr.push(entry)
    await fs.writeFile(dataPath, JSON.stringify(arr, null, 2), 'utf-8')
    return new Response(JSON.stringify(entry), { status: 201 })
  }catch(e){
    return new Response(JSON.stringify({ error: String(e) }), { status: 500 })
  }
}
