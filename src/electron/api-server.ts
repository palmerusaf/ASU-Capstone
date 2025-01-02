import express from 'express';

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
