import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  try {
    const { session_id, lang = 'ru', message } = req.body || {}
    const text = (message || '').toLowerCase()
    let reply = 'Извините, я не понял. Можете уточнить?'
    let actions: string[] = []

    if (text.includes('образец') || text.includes('sample')) {
      reply = 'Мы отправляем бесплатные образцы по СНГ. Укажите имя, город и адрес доставки или выберите "Заберу в шоуруме".'
      actions = ['request_contact','open_sample_form']
    } else if (text.includes('расчёт') || text.includes('чертеж')) {
      reply = 'Загрузите чертёж (PDF/DWG/DXF) и укажите толщину и обработку кромки — я сделаю предварительный расчёт.'
      actions = ['request_upload','open_custom_order']
    } else if (text.includes('дилер') || text.includes('партн')) {
      reply = 'Для партнёров заполните заявку. Хотите, чтобы я открыл форму?'
      actions = ['open_partner_form']
    } else if (text.includes('ar') || text.includes('просмотр')) {
      reply = 'Откройте AR-просмотр из карточки продукта или нажмите "Посмотреть в AR".'
      actions = ['open_ar']
    }

    return res.status(200).json({ reply, actions })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Server error' })
  }
}
