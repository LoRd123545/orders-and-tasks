import { createServer } from 'node:http';

import express from 'express';

import middleware from './middleware/index.js';

import { httpCodes } from './shared/index.js';

import appRouter from './routes/index.js';

const { PORT, NODE_ENV, MAILGUN_API_KEY } = process.env;

const app = express();
const server = createServer(app);

// middleware
app.use(middleware.logUrls);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/healthcheck', (req, res) => {
  res.sendStatus(httpCodes.EMPTY_RESPONE);
});

app.use('/v1', appRouter, middleware.handleErrors);

app.use('*', (req, res) => {
  res.status(httpCodes.NOT_FOUND).json({
    message: 'What are you looking for bruh',
  });
});

server.listen(PORT, () => {
  console.log(`http server listening on port ${PORT}`);
});

const gracefulShutdown = () => {
  console.log('Closing server!');
  server.close(async () => {
    server.closeAllConnections();
    console.log('Closed all connections!');
    process.exit(0);
  });
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown);
