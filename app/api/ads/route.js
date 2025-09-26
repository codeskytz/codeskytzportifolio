import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

const dataFile = path.join(process.cwd(), 'data', 'ads.json')

function readAds(){
  try{ return JSON.parse(fs.readFileSync(dataFile,'utf-8')) }catch(e){return []}
}

export async function GET(){
  const ads = readAds()
  return NextResponse.json({data:ads})
}

export async function POST(req){
  const body = await req.json()
  const { url, alt } = body
  if(!url) return NextResponse.json({error:'Missing url'},{status:400})
  const ads = readAds()
  const newA = { id: `ad_${Date.now()}`, url, alt: alt||'' }
  ads.unshift(newA)
  try{ fs.writeFileSync(dataFile,JSON.stringify(ads,null,2)) }catch(e){console.error(e)}
  return NextResponse.json({data:newA},{status:201})
}
