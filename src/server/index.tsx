import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { cors } from 'hono/cors'
import { analyzeWithAI, type AIAnalysisRequest } from '../services/ai'
import { storage } from '../services/storage'

// Define Cloudflare Bindings type
type Bindings = {
  DB: D1Database;
  OPENAI_API_KEY: string;
  OPENAI_BASE_URL: string;
}

const app = new Hono<{ Bindings: Bindings }>()

// Enable CORS
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// ============================================
// API ROUTES ONLY
// ============================================

// Documents API
app.get('/api/documents', async (c) => {
  const documents = await storage.getDocuments();
  return c.json({ success: true, data: documents });
})

app.get('/api/documents/:id', async (c) => {
  const id = c.req.param('id');
  const doc = await storage.getDocumentById(id);
  
  if (!doc) {
    return c.json({ success: false, error: 'Document not found' }, 404);
  }
  
  await storage.incrementDocumentView(id);
  return c.json({ success: true, data: doc });
})

app.post('/api/documents', async (c) => {
  try {
    const body = await c.req.json();
    const { title, category, summary, embed_url } = body;
    
    if (!title || !category || !embed_url) {
      return c.json({ 
        success: false, 
        error: 'Missing required fields: title, category, embed_url' 
      }, 400);
    }
    
    let embed_type: 'gdrive' | 'canva' | 'dropbox' | 'local' = 'local';
    if (embed_url.includes('drive.google.com') || embed_url.includes('docs.google.com')) {
      embed_type = 'gdrive';
    } else if (embed_url.includes('canva.com')) {
      embed_type = 'canva';
    } else if (embed_url.includes('dropbox.com')) {
      embed_type = 'dropbox';
    }
    
    const newDoc = await storage.addDocument({
      title,
      category,
      file_path: embed_url,
      file_type: 'embed',
      file_size: 0,
      summary: summary || '',
      embed_url,
      embed_type
    });
    
    return c.json({ success: true, data: newDoc });
  } catch (error) {
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
})

app.delete('/api/documents/:id', async (c) => {
  const id = c.req.param('id');
  const success = await storage.deleteDocument(id);
  
  if (!success) {
    return c.json({ success: false, error: 'Document not found' }, 404);
  }
  
  return c.json({ success: true });
})

app.post('/api/documents/:id/download', async (c) => {
  try {
    const id = c.req.param('id');
    await storage.incrementDocumentDownload(id);
    return c.json({ success: true });
  } catch (error) {
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
})

// AI Analysis API
app.post('/api/ai/analyze', async (c) => {
  try {
    const request: AIAnalysisRequest = await c.req.json()
    
    const apiKey = c.env?.OPENAI_API_KEY
    const baseURL = c.env?.OPENAI_BASE_URL
    
    if (!apiKey) {
      return c.json({ success: false, error: 'API key not configured' }, 500)
    }
    
    const result = await analyzeWithAI(request, apiKey, baseURL)
    
    await storage.saveAnalysis({
      input: request.input,
      output: result.data?.output || '',
      model: request.config.model,
      type: 'general'
    })
    
    return c.json(result)
  } catch (error) {
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500)
  }
})

app.get('/api/ai/models', (c) => {
  return c.json({
    success: true,
    data: [
      { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', provider: 'Google' },
      { id: 'gpt-4.1-mini', name: 'GPT-4.1 Mini', provider: 'OpenAI' },
      { id: 'gpt-4.1-nano', name: 'GPT-4.1 Nano', provider: 'OpenAI' },
      { id: 'claude-3-5-sonnet-20241022', name: 'Claude 3.5 Sonnet', provider: 'Anthropic' }
    ]
  })
})

app.get('/api/analysis/history', async (c) => {
  try {
    const limit = parseInt(c.req.query('limit') || '50');
    const history = await storage.getAnalysisHistory(limit);
    return c.json({ success: true, data: history });
  } catch (error) {
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
})

app.get('/api/analysis/statistics', async (c) => {
  try {
    const stats = await storage.getAnalysisStatistics();
    return c.json({ success: true, data: stats });
  } catch (error) {
    return c.json({ success: false, error: 'Failed to get statistics' }, 500);
  }
})

app.get('/api/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// ============================================
// SPA FALLBACK - Serve React App
// ============================================
app.get('*', (c) => {
  return c.html(`
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fotober R&D Intelligence Hub</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link href="/static/global-styles.css" rel="stylesheet">
</head>
<body class="min-h-screen">
    <div id="root"></div>
    <script type="module" src="/src/client/index.tsx"></script>
</body>
</html>
  `)
})

export default app
