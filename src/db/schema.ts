import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const connect = sqliteTable('connect', {
  id: int('id').primaryKey({ autoIncrement: true }),
  name: text('name', { enum: ['handshake'] })
    .notNull()
    .unique()
})
