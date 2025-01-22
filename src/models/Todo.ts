import { Model } from 'objection'

export class Todo extends Model {
  static tableName = 'todos'

  id!: number
  title!: string
  completed!: boolean
  created_at!: Date

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title'],
      properties: {
        id: { type: 'integer' },
        title: { type: 'string', minLength: 1, maxLength: 255 },
        completed: { type: 'boolean', default: false },
        created_at: { type: 'string', format: 'date-time' }
      }
    }
  }

  $formatJson(json: any) {
    json = super.$formatJson(json)
    return {
      ...json,
      completed: Boolean(json.completed)
    }
  }
} 