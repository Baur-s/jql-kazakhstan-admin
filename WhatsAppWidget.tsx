'use client'
export default function WhatsAppWidget() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '87087090069'
  const message = encodeURIComponent('Здравствуйте! Интересует продукция JQL.')
  return (
    <a href={`https://wa.me/${phone}?text=${message}`} target="_blank" rel="noreferrer" className="fixed right-6 bottom-6 bg-[#25D366] p-3 rounded-full shadow-lg z-50">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382..."/></svg>
    </a>
  )
}
