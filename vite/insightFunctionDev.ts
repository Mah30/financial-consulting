import type { IncomingMessage } from 'node:http'
import type { Plugin } from 'vite'

function readBody(request: IncomingMessage) {
  return new Promise<Uint8Array>((resolve, reject) => {
    const chunks: Uint8Array[] = []

    request.on('data', (chunk: Uint8Array) => chunks.push(chunk))
    request.on('end', () => resolve(Buffer.concat(chunks)))
    request.on('error', reject)
  })
}

function createHeaders(request: IncomingMessage) {
  const headers = new Headers()

  for (const [name, value] of Object.entries(request.headers)) {
    if (Array.isArray(value)) {
      value.forEach((item) => headers.append(name, item))
    } else if (value !== undefined) {
      headers.set(name, value)
    }
  }

  return headers
}

export function insightFunctionDev(geminiApiKey?: string): Plugin {
  return {
    name: 'poket-mentor-insight-function-dev',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/insight', async (req, res, next) => {
        try {
          if (!process.env.GEMINI_API_KEY && geminiApiKey) {
            process.env.GEMINI_API_KEY = geminiApiKey
          }

          const url = new URL(
            req.originalUrl ?? req.url ?? '/api/insight',
            `http://${req.headers.host ?? 'localhost'}`,
          )
          const method = req.method ?? 'GET'
          const body =
            method === 'GET' || method === 'HEAD'
              ? undefined
              : await readBody(req)
          const request = new Request(url, {
            method,
            headers: createHeaders(req),
            body,
          })
          const { default: insightHandler } =
            await import('../netlify/functions/insight.mts')
          const response = await insightHandler(request)

          res.statusCode = response.status
          response.headers.forEach((value, name) => res.setHeader(name, value))
          res.end(Buffer.from(await response.arrayBuffer()))
        } catch (error) {
          next(error)
        }
      })
      server.middlewares.use('/api/conversation', async (req, res, next) => {
        try {
          if (!process.env.GEMINI_API_KEY && geminiApiKey) {
            process.env.GEMINI_API_KEY = geminiApiKey
          }

          const url = new URL(
            req.originalUrl ?? req.url ?? '/api/conversation',
            `http://${req.headers.host ?? 'localhost'}`,
          )
          const method = req.method ?? 'GET'
          const body =
            method === 'GET' || method === 'HEAD'
              ? undefined
              : await readBody(req)
          const request = new Request(url, {
            method,
            headers: createHeaders(req),
            body,
          })
          const { default: conversationHandler } =
            await import('../netlify/functions/conversation.mts')
          const response = await conversationHandler(request)

          res.statusCode = response.status
          response.headers.forEach((value, name) => res.setHeader(name, value))
          res.end(Buffer.from(await response.arrayBuffer()))
        } catch (error) {
          next(error)
        }
      })
    },
  }
}
