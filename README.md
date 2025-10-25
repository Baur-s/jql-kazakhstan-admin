JQL DesignBot Package - MVP Starter
----------------------------------

What is included:
- next_api/: Next.js API example endpoints (message routing, upload)
- widget/: embeddable React chat widget (DesignBotWidget)
- prompts/: system + few-shot + RAG template
- scripts/: embedding pipeline example
- e2e_tests/: Playwright scaffold

How to use:
1. Copy next_api pages into your Next.js project (pages/api/).
2. Deploy env vars: S3_BUCKET,S3_REGION,S3_KEY,S3_SECRET,BITRIX_WEBHOOK_URL,OPENAI_API_KEY,PINECONE_API_KEY
3. Install dependencies (aws-sdk, formidable, node-fetch, @aws-sdk/client-s3, etc).
4. Use widget in frontend by importing the component and rendering <DesignBotWidget apiBase="/api" />

Security note: This is a starter. Do not use in production without audits, rate limits, auth checks and virus scanning for uploads.
