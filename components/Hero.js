"use client"

import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'

export default function Hero(){
  const [ads, setAds] = useState([])
  const [index, setIndex] = useState(0)
  const ivRef = useRef(null)

  useEffect(()=>{
    let mounted = true
    fetch('/api/ads').then(r=>r.json()).then(j=>{ if(mounted) setAds(j.data||[]) }).catch(()=>{})
    return ()=>{ mounted=false }
  },[])

  useEffect(()=>{
    if(ivRef.current) clearInterval(ivRef.current)
    if(ads.length>1){
      ivRef.current = setInterval(()=> setIndex(i=> (i+1) % ads.length), 2000)
    }
    return ()=>{ if(ivRef.current) clearInterval(ivRef.current) }
  },[ads])

  function prev(){ setIndex(i=> (i-1+ads.length)%ads.length) }
  function next(){ setIndex(i=> (i+1)%ads.length) }

  return (
    <section id="home" className="py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold">Innovation With No Limit</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">We build secure, performant web apps, AI integrations, and automation systems that scale.</p>
          <div className="mt-6 flex gap-3">
            <Link href="#portfolio" className="px-4 py-2 rounded bg-cyan text-primary font-semibold fast-action">View Work</Link>
            <Link href="/contact" className="px-4 py-2 rounded border fast-action">Contact</Link>
          </div>
        </div>
        <div>
          <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg">
            {ads.length===0 ? (
              <div className="w-full h-full bg-gradient-to-tr from-primary to-cyan" />
            ) : (
              ads.map((a,idx)=> (
                <img key={a.id} src={a.url} alt={a.alt||'ad'} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${idx===index? 'opacity-100':'opacity-0'}`} />
              ))
            )}

            {ads.length>0 && (
              <>
                <button onClick={prev} aria-label="Previous" className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2 fast-action">‹</button>
                <button onClick={next} aria-label="Next" className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2 fast-action">›</button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
