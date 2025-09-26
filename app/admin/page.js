"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin(){
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [err, setErr] = useState('')
  const router = useRouter()

  function submit(e){
    e.preventDefault()
    if(user==='codeskytz' && pass==='codeskytz123'){
      // simple session
      sessionStorage.setItem('codesky_admin','1')
      router.push('/admin/dashboard')
    }else{
      setErr('Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={submit} className="w-full max-w-md bg-white dark:bg-slate-900 p-6 rounded shadow">
        <h2 className="text-2xl font-semibold">Admin Login</h2>
        <p className="text-sm text-gray-600 mt-2">Enter your credentials to access the admin dashboard.</p>

        <div className="mt-4">
          <label className="text-sm">Username</label>
          <input value={user} onChange={e=>setUser(e.target.value)} className="w-full p-2 border rounded mt-1" />
        </div>

        <div className="mt-3">
          <label className="text-sm">Password</label>
          <input value={pass} onChange={e=>setPass(e.target.value)} type="password" className="w-full p-2 border rounded mt-1" />
        </div>

        {err && <p className="mt-3 text-sm text-red-600">{err}</p>}

        <div className="mt-5 flex justify-end">
          <button type="submit" className="px-4 py-2 rounded bg-indigo-600 text-white fast-action">Sign in</button>
        </div>
      </form>
    </div>
  )
}
