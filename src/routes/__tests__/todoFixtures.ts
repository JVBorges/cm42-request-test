import { faker } from '@faker-js/faker'
import { Todo } from '~/models/Todo'

const generateTodo = () => ({
    title: faker.lorem.word(2)
})

export const create = () => Todo.query().insertAndFetch(generateTodo())
export const createList = (quantity: number) => 
    Todo
        .query()
        .insertGraphAndFetch(
            faker.helpers.multiple(
                generateTodo,
                { count: quantity }
            )
        )