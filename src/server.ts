import Fastify, { FastifyServerOptions } from 'fastify'
import databaseConfig from 'knexfile'

import { setupDatabase } from '~/database/setup'

import { todoRoutes } from './routes/todoRoutes'
import userRoutes from './routes/userRoutes'

export function buildApp(opts: FastifyServerOptions = {}) {
  const app = Fastify(opts)

  app.register(todoRoutes, { prefix: '/api/todos' })
  app.register(userRoutes, { prefix: '/api/users' })

  return app
}

export async function startServer() {
  const app = buildApp({
    logger: {
      level: 'info',
      transport: {
        target: 'pino-pretty',
      }
    }
  })
  
  try {
    setupDatabase()
    await app.listen({ port: 3000 })
    console.log('Server running at http://localhost:3000')
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
