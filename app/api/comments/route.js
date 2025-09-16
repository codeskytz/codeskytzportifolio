import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'
import { rateLimit } from '../../../lib/rateLimit'

const dataFile = path.join(process.cwd(), 'data', 'comments.json')

function readComments(){
  try{ return JSON.parse(fs.readFileSync(dataFile,'utf-8')) }catch(e){return []}
}

export async function GET(){
  const comments = readComments()
  return NextResponse.json({data:comments})
}

export async function POST(req){
  const body = await req.json()
  const {name,email,rating,comment} = body
  if(!name||!email||!comment) return NextResponse.json({error:'Missing fields'},{status:400})

  const rl = rateLimit('comments-'+(req.headers.get('x-forwarded-for')||'anon'), 50, 60)
  if(rl.limited) return NextResponse.json({error:'Too many requests'},{status:429})

  const comments = readComments()
  const newC = {id:`c_${Date.now()}`,name,email,rating:rating||5,comment,date:new Date().toISOString().slice(0,10)}
  comments.unshift(newC)
  try{ fs.writeFileSync(dataFile,JSON.stringify(comments,null,2)) }catch(e){console.error(e)}
  return NextResponse.json({data:newC},{status:201})
}
