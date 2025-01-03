import { eq } from 'drizzle-orm';
import { usersTable } from '../db/schema.js';
import express from 'express';
import { drizzle } from 'drizzle-orm/libsql';

const db = drizzle('file:local.db');
const user: typeof usersTable.$inferInsert = {
  name: 'John',
  age: 30,
  email: 'john@example.com',
};

await db.insert(usersTable).values(user);
console.log('New user created!');

const users = await db.select().from(usersTable);
console.log('Getting all users from the database: ', users);
/*
  const users: {
    id: number;
    name: string;
    age: number;
    email: string;
  }[]
  */

await db
  .update(usersTable)
  .set({
    age: 31,
  })
  .where(eq(usersTable.email, user.email));
console.log('User info updated!');

// await db.delete(usersTable).where(eq(usersTable.email, user.email));
// console.log('User deleted!');

export function getApiUrl(): string {
  return _apiUrl;
}

let _apiUrl: string;

const app = express();

app.get('/', (_, res) => {
  res.send('hello');
});

// dynamically assign port
const server = app.listen(0, () => {
  const servInfo = server.address();
  if (!servInfo || typeof servInfo === 'string') {
    console.error('Error port not assigned');
    throw 'Error port not assigned';
  }
  _apiUrl = 'http://localhost:' + servInfo.port;
  console.log('Express API server listening on server ' + getApiUrl());
});
