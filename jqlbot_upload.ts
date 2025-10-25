import type { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'
import fs from 'fs'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import fetch from 'node-fetch'

export const config = { api: { bodyParser: false } }

const s3 = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_KEY || '',
    secretAccessKey: process.env.S3_SECRET || '',
  }
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' })
  const form = new formidable.IncomingForm({ multiples: false })
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ message: 'Upload error', error: err })
    try {
      const file = files.file as formidable.File
      const buffer = fs.readFileSync(file.filepath)
      const key = `uploads/${Date.now()}-${file.originalFilename}`
      await s3.send(new PutObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: key,
        Body: buffer,
        ContentType: file.mimetype || 'application/octet-stream'
      }))
      const fileUrl = `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/${key}`
      if (process.env.BITRIX_WEBHOOK_URL) {
        const payload = { TITLE: `Custom Order - ${fields.name || ''}`, COMMENTS: `File: ${fileUrl}` }
        await fetch(process.env.BITRIX_WEBHOOK_URL, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) })
      }
      return res.status(200).json({ message: 'File uploaded', fileUrl })
    } catch (e) {
      console.error(e)
      return res.status(500).json({ message: 'Server error', error: e })
    }
  })
}
