export async function createBitrix24Deal({ client_name, phone, email, type, region, comments }: any) {
  const url = process.env.BITRIX24_WEBHOOK_URL;
  if (!url) { console.warn('No Bitrix webhook configured'); return false; }
  try {
    const res = await fetch(url, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ fields: { TITLE: `JQL - ${type} - ${client_name}`, COMMENTS: comments } }) });
    return res.ok;
  } catch (e) {
    console.error('Bitrix error', e);
    return false;
  }
}
