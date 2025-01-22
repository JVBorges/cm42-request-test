import { FastifyInstance } from 'fastify';

import { User } from '~/models/User';

async function userRoutes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    const { limit = 10, offset = 0 } = request?.query as { limit?: number; offset?: number };
    const users = await User.query().limit(limit).offset(offset);
    reply.header('Cache-Control', 'public, max-age=60');
    return users;
  });

  app.post('/', async (request, reply) => {
    const { name, email } = request.body as { name: string; email: string };

    if (!name || !email) {
      return reply.status(400).send({ message: 'Name and email are required.' });
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return reply.status(400).send({ message: 'Invalid email format.' });
    }

    try {
      const newUser = await User.query().insert({ name, email });
      reply.status(201).send(newUser);
    } catch (err) {
      reply.status(500).send({ message: "Unesxpected error happened" });
    }
  });

  app.get('/:id', async (request, reply) => {
    const { id } = request.params as { id: string }

    const user = await User.query().findById(id);

    if (!user) {
      return reply.status(404).send({ message: 'User not found' });
    }

    return user;
  });
}

export default userRoutes;