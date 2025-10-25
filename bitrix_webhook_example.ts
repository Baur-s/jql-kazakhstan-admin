// Example helper to create Bitrix24 deal via webhook
import fetch from 'node-fetch'
export async function createBitrixDeal({ title, phone, comments }: any) {
  const url = process.env.BITRIX_WEBHOOK_URL
  if (!url) return null
  const payload = { TITLE: title, PHONE: phone, COMMENTS: comments }
  const res = await fetch(url, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) })
  return res.ok
}
