import express from 'express';
let _port: number;

export function getPort() {
  return _port;
}

export function startServer() {
  const app = express();

  app.get('/', (_, res) => {
    res.send('hello');
  });

  // dynamically assign port
  const server = app.listen(0, () => {
    const servInfo = server.address();
    if (servInfo && typeof servInfo === 'object') _port = servInfo.port;
    else throw 'Error: Port not assigned';
    console.log('Express API server listening on port' + _port);
  });
}
