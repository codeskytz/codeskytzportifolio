import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

const dataFile = path.join(process.cwd(), 'data', 'ads.json')

function readAds(){
  try{ return JSON.parse(fs.readFileSync(dataFile,'utf-8')) }catch(e){return []}
}

export async function DELETE(req,{ params }){
  const { id } = params
  let ads = readAds()
  const before = ads.length
  ads = ads.filter(a=>a.id!==id)
  if(ads.length===before) return NextResponse.json({error:'Not found'},{status:404})
  try{ fs.writeFileSync(dataFile,JSON.stringify(ads,null,2)) }catch(e){console.error(e)}
  return NextResponse.json({data:{id}})
}

export async function PUT(req,{ params }){
  const { id } = params
  const body = await req.json()
  let ads = readAds()
  let found = false
  ads = ads.map(a=>{ if(a.id===id){ found=true; return {...a, ...body} } return a })
  if(!found) return NextResponse.json({error:'Not found'},{status:404})
  try{ fs.writeFileSync(dataFile,JSON.stringify(ads,null,2)) }catch(e){console.error(e)}
  return NextResponse.json({data:ads.find(a=>a.id===id)})
}
