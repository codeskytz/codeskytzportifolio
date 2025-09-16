import { NextResponse } from 'next/server'
import { rateLimit } from '../../../lib/rateLimit'

export async function POST(req){
  const body = await req.json()
  const {name,email,message} = body
  if(!name||!email||!message) return NextResponse.json({error:'Missing fields'},{status:400})

  const rl = rateLimit('contact-'+(req.headers.get('x-forwarded-for')||'anon'), 20, 60)
  if(rl.limited) return NextResponse.json({error:'Too many requests'},{status:429})

  // stub: send email via SMTP or third-party service
  console.log('Contact form submission', {name,email,message})
  return NextResponse.json({ok:true,message:'Email sent (stub)'});
}
