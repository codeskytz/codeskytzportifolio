import fs from 'fs'
import path from 'path'

const dataFile = path.join(process.cwd(), 'data', 'comments.json')

function readComments(){
  try{ return JSON.parse(fs.readFileSync(dataFile,'utf-8')) }catch(e){ return [] }
}

export async function DELETE(req, { params }){
  try{
    const id = params.id
    const comments = readComments()
    const idx = comments.findIndex(c=>c.id === id)
    if(idx === -1) return new Response(JSON.stringify({ error: 'not found' }), { status: 404 })
    const removed = comments.splice(idx,1)[0]
    fs.writeFileSync(dataFile, JSON.stringify(comments, null, 2))
    return new Response(JSON.stringify({ ok: true, removed }), { status: 200 })
  }catch(e){
    return new Response(JSON.stringify({ error: String(e) }), { status: 500 })
  }
}
