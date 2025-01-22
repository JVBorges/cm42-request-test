# Todo API

A simple RESTful API built with Fastify, Knex.js, and Objection.js for managing todos and users.

## Technologies

- Node.js (v22.13.1)
- TypeScript
- Fastify
- Knex.js
- Objection.js
- SQLite3
- Vitest for testing

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Run database migrations:
```bash
npm run migrate:dev
npm run migrate:test
```
4. Start the development server:
```bash
npm run dev
```

The server will start at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run test` - Run tests
- `npm run migrate` - Run database migrations
- `npm run knex` - Run Knex.js CLI commands

## API Endpoints

### Todos

- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get a specific todo
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get a specific user
- `POST /api/users` - Create a new user

## Project Structure

- `/src/models` - Database models
- `/src/routes` - API route handlers
- `/src/database` - Database configuration and migrations

## Testing

The project includes integration tests for the API endpoints. Run the tests with:
```bash
npm test
```