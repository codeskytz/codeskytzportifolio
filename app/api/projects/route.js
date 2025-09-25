import { promises as fs } from 'fs'
import path from 'path'

const dataPath = path.join(process.cwd(), 'data', 'portfolio.json')

export async function GET(){
  try{
    const raw = await fs.readFile(dataPath, 'utf-8')
    const json = JSON.parse(raw)
    return new Response(JSON.stringify(json), { status: 200 })
  }catch(e){
    return new Response(JSON.stringify([]), { status: 200 })
  }
}

export async function POST(req){
  try{
    const body = await req.json()
    const raw = await fs.readFile(dataPath, 'utf-8')
    const arr = JSON.parse(raw || '[]')
    // ensure id
    const id = body.id || `p${Date.now()}`
    const entry = { id, title: body.title || 'Untitled', summary: body.summary || '', category: body.category || 'web', tags: body.techs || [], live: body.live || '', github: body.github || '' }
    // optionally include front as local path or remote URL
    if(body.front) entry.front = body.front
    if(body.gallery) entry.gallery = body.gallery
    arr.push(entry)
    await fs.writeFile(dataPath, JSON.stringify(arr, null, 2), 'utf-8')
    return new Response(JSON.stringify(entry), { status: 201 })
  }catch(err){
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 })
  }
}
