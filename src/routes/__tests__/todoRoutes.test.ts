import { FastifyInstance } from "fastify";
import { Knex } from "knex";
import { afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { setupDatabase } from "~/database/setup";
import { buildApp } from "~/server";
import { create, createList } from "./todoFixtures";

describe("Todo routes", () => {
	let app: FastifyInstance
	let knex: Knex;

	beforeAll(() => {
		app = buildApp()
		knex = setupDatabase()
	})

	beforeEach(async () => {
		await knex('todos').truncate()
	})

	describe("GET /todos", () => {
		it("should return a empty array when there is no todos", async () => {
			const response = await app.inject({
				url: '/api/todos',
				method: 'GET',
			})

			const body = await response.json()

			expect(response.statusCode).toBe(200)
			expect(body).toEqual([])
		})

		it("should return a list of todos", async () => {
			await createList(15)

			const response = await app.inject({
				url: '/api/todos',
				method: 'GET',
			})

			const body = await response.json()

			expect(response.statusCode).toBe(200)
			expect(body).toEqual(
				expect.arrayContaining(
					[
						expect.objectContaining(
							{
								id: expect.any(Number),
								title: expect.any(String),
								completed: expect.any(Boolean),
								created_at: expect.any(String)
							}
						)
					]
				)
			)
		})
	})

	describe("GET /todos/:id", () => {
		it("should return a todo with given id", async () => {
			const todo = await create()

			const response = await app.inject({
				method: 'GET',
				url: `/api/todos/${todo.id}`
			})

			const body = await response.json()

			expect(response.statusCode).toBe(200)
			expect(body).toBe(todo)
		})
	})

	describe("POST /todos", () => {
		describe("when payload is invalid", () => {
			it("should return an error when title is missing", async () => {
				const response = await app.inject({
					url: '/api/todos',
					method: 'POST',
				})

				const body = await response.json()
				
				expect(response.statusCode).toBe(400)
				expect(body).toMatchObject({ error: "title is required" })
			})
		})

		describe("when payload is valid", () => {
			it("should return a new todo", async () => {
				const response = await app.inject({
					url: '/api/todos',
					method: 'POST',
					payload: {
						title: 'Sleep'
					}
				})

				const body = await response.json()

				expect(response.statusCode).toBe(200)
				expect(body.id).toBeDefined()
				expect(body.title).toBe('Sleep')
				
				expect(body).toEqual(
					expect.objectContaining(
						{
							id: expect.any(Number),
							title: expect.any(String),
							completed: expect.any(Boolean),
							created_at: expect.any(String)
						}
					)
				)
			})
		})
	})

	describe.skip("PUT /todos/:id", () => {})
})