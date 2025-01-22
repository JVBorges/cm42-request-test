import { FastifyInstance } from 'fastify'

import { Todo } from '~/models/Todo'

export async function todoRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    return await Todo.query()
  })

  app.get('/:id', async (request, reply) => {
    const { id } = request.params as { id: string }
    const todo = await Todo.query().findById(id)
    
    if (!todo) {
      return reply.status(404).send({ error: 'Todo not found' })
    }
    
    return todo
  })

  app.post('/', async (request) => {
    const todo = request.body as { title: string }
    return await Todo.query().insert(todo)
  })

  app.put('/:id', async (request, reply) => {
    const { id } = request.params as { id: string }
    const updates = request.body as Partial<Todo>
    
    const updated = await Todo.query().patchAndFetchById(id, updates)
    
    if (!updated) {
      return reply.status(404).send({ error: 'Todo not found' })
    }
    
    return updated
  })
} 