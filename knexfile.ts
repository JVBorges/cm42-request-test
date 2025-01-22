import type { Knex } from 'knex'

export type DatabaseConfig = Knex.Config
export type DatabaseEnv = 'development' | 'test'

type Config = {
  [key in DatabaseEnv]: DatabaseConfig
}

const config: Config = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './src/database/migrations'
    },
    seeds: {
      directory: './src/database/seeds'
    }
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: './test.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './src/database/migrations'
    },
    seeds: {
      directory: './src/database/seeds'
    }
  }
}


export default config 