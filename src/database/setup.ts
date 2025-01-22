import Knex from 'knex'
import config, { DatabaseEnv } from 'knexfile'

import { Model } from 'objection'

const getConfig = () => {
  const env = process.env.NODE_ENV || 'development'
  return config[env as DatabaseEnv]
}

export function setupDatabase() {
  const knex = Knex(getConfig())
  Model.knex(knex)
  return knex
} 