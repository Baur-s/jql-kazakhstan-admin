'use client'
import { useState } from 'react'
export function FileUpload({ productId }: any) {
  const [file, setFile] = useState<File|null>(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [region, setRegion] = useState('Almaty')
  const [status, setStatus] = useState('')

  async function handleSubmit(e:any){
    e.preventDefault()
    if(!file){ setStatus('Attach a file'); return }
    setStatus('Uploading...')
    const fd = new FormData()
    fd.append('file', file)
    fd.append('name', name)
    fd.append('phone', phone)
    fd.append('email', email)
    fd.append('region', region)
    try {
      const res = await fetch('/api/custom-order', { method: 'POST', body: fd })
      const json = await res.json()
      setStatus(json.message || 'Done')
    } catch (err) {
      console.error(err)
      setStatus('Upload failed')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input className="w-full p-2 bg-card rounded" placeholder="Имя / Компания" value={name} onChange={e=>setName(e.target.value)} />
      <input className="w-full p-2 bg-card rounded" placeholder="Телефон" value={phone} onChange={e=>setPhone(e.target.value)} />
      <input className="w-full p-2 bg-card rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <select value={region} onChange={e=>setRegion(e.target.value)} className="w-full p-2 bg-card rounded">
        <option>Almaty</option><option>Astana</option><option>Shymkent</option>
      </select>
      <input type="file" onChange={e=>setFile(e.target.files?.[0] ?? null)} />
      <button type="submit" className="bg-primary text-black px-4 py-2 rounded">Отправить</button>
      <div className="text-gray-400">{status}</div>
    </form>
  )
}
