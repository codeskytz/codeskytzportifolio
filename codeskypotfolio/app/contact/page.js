"use client"
import { useForm } from 'react-hook-form'

export default function Contact(){
  const {register,handleSubmit,formState:{errors}} = useForm()

  const onSubmit = async (data)=>{
    try{
      const res = await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)})
      const json = await res.json()
      alert(json.message||'Sent')
    }catch(e){
      alert('Failed to send')
    }
  }

  return (
    <section id="contact" className="py-12">
      <h2 className="text-2xl font-semibold mb-4">Contact</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
        <input {...register('name',{required:true})} placeholder="Name" className="px-3 py-2 border" />
        <input {...register('email',{required:true})} placeholder="Email" className="px-3 py-2 border" />
        <textarea {...register('message',{required:true})} placeholder="Message" className="px-3 py-2 border md:col-span-2" />
        <button type="submit" className="px-4 py-2 bg-cyan text-primary rounded md:col-span-2">Send</button>
      </form>
    </section>
  )
}
