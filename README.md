# Orion Studio (Vercel)

Minimal working app with:
- /api/voiceover (OpenAI)
- /api/render (Eden)
- /api/status (Eden)
- /api/health
- Home page with buttons to test all endpoints

## Deploy
1. Add env vars in Vercel:
   - OPENAI_API_KEY
   - EDEN_API_KEY
2. Deploy
3. Open / (UI) and /api/health (should return { ok: true })
