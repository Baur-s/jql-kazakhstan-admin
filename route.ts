import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import SampleOrder from '@/models/SampleOrder';
import { createBitrix24Deal } from '@/lib/bitrix24';
function generateTrackingId() {
  return 'SAMPLE_' + Date.now().toString(36) + Math.random().toString(36).substr(2,5).toUpperCase();
}
export async function POST(req:any) {
  await dbConnect();
  try {
    const body = await req.json();
    const { name, address, phone, email, sample_ids, region } = body;
    if (!name || !address || !phone || !sample_ids || !Array.isArray(sample_ids) || sample_ids.length===0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const trackingId = generateTrackingId();
    const order = new SampleOrder({ trackingId, name, address, phone, email, sampleIds: sample_ids, region, status: 'pending' });
    await order.save();
    await createBitrix24Deal({ client_name: name, phone, email: email||'', type: 'Sample Request', region: region||'N/A', comments: `Samples: ${sample_ids.join(', ')}, Address: ${address}` });
    return NextResponse.json({ message: 'Sample request created', tracking_id: trackingId });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
