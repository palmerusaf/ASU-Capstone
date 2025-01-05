import * as sq from 'drizzle-orm/sqlite-core'

export const usersTable = sq.sqliteTable('users_table', {
  id: sq.int().primaryKey({ autoIncrement: true }),
  name: sq.text().notNull()
})
