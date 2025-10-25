'use client'
import React, { useState } from 'react'

export default function DesignBotWidget({ apiBase = '/api' }: any) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{from:string,text:string}>>([ {from:'bot', text:'Здравствуйте! Я JQL DesignBot. Чем помочь?'} ])
  const [text, setText] = useState('')

  async function send() {
    if (!text) return
    const userMsg = { from: 'user', text }
    setMessages(prev=>[...prev, userMsg])
    setText('')
    try {
      const res = await fetch(`${apiBase}/jqlbot_message`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ message: text }) })
      const json = await res.json()
      setMessages(prev=>[...prev, {from:'bot', text: json.reply || '...'}])
    } catch (e) {
      setMessages(prev=>[...prev, {from:'bot', text: 'Ошибка: не удалось отправить сообщение.'}])
    }
  }

  return (
    <div style={{position:'fixed', right:20, bottom:20, zIndex:9999}}>
      {!open && <button onClick={()=>setOpen(true)} className="bg-[#C1A36D] text-black px-4 py-3 rounded-full shadow-lg">JQL</button>}
      {open && (
        <div style={{width:320, height:480, background:'#0E0E0E', color:'#fff', borderRadius:8, boxShadow:'0 10px 30px rgba(0,0,0,0.4)'}}>
          <div style={{padding:12, borderBottom:'1px solid rgba(255,255,255,0.06)'}}>JQL DesignBot <button onClick={()=>setOpen(false)} style={{float:'right'}}>✕</button></div>
          <div style={{padding:12, height:360, overflowY:'auto'}}>
            {messages.map((m,i)=> <div key={i} style={{margin:'8px 0', textAlign: m.from==='bot' ? 'left' : 'right'}}><div style={{display:'inline-block', background: m.from==='bot' ? '#1A1A1A' : '#C1A36D', color: m.from==='bot' ? '#fff' : '#000', padding:8, borderRadius:6}}>{m.text}</div></div>)}
          </div>
          <div style={{padding:12, display:'flex', gap:8}}>
            <input value={text} onChange={e=>setText(e.target.value)} placeholder="Напишите сообщение..." style={{flex:1, padding:8, borderRadius:6, border:'1px solid rgba(255,255,255,0.06)', background:'#0E0E0E', color:'#fff'}} />
            <button onClick={send} style={{background:'#C1A36D', borderRadius:6, padding:'8px 12px'}}>Send</button>
          </div>
        </div>
      )}
    </div>
  )
}
