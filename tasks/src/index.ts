import { createServer } from 'node:http';

import express from 'express';

import middleware from '@app/middleware/index.js';

import database from '@app/config/database.js';
import messageBroker from '@app/config/messageBroker.js';

import { httpCodes } from '@app/shared/index.js';

import appRouter from '@app/routes/index.js';

import { DatabaseError } from '@app/shared/errors/index.js';

const { PORT, NODE_ENV, AMQP_EXCHANGE } = process.env;

const channel = await messageBroker.init();

const queuePromise = channel.assertQueue('', { exclusive: true });

queuePromise.then((q) => {
  const bindQueuePromise = channel.bindQueue(q.queue, AMQP_EXCHANGE || 'orders', '')
  bindQueuePromise.then(() => {
    channel.consume(q.queue, (msg) => {
      console.log(msg?.content.toString())
    }, {
      noAck: true,
    })
  })
})

try {
  await database.authenticate();
  console.log('Successfully connnected to database!');
} catch (err) {
  const message = 'Error while connecting to database!';

  throw new DatabaseError(message, '', err, true);
}

if (NODE_ENV === 'development') {
  try {
    await database.sync({ alter: true });
    console.log('Successfully sync models in database!');
  } catch (err) {
    const message = 'Error while syncing models in database!';

    throw new DatabaseError(message, '', err, true);
  }
}

const app = express();
const server = createServer(app);

// middleware
app.use(middleware.logUrls);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/healthcheck', (req, res) => {
  res.sendStatus(httpCodes.EMPTY_RESPONE);
})

app.use('/v1', appRouter, middleware.handleErrors);

app.use('*', (req, res) => {
  res.status(httpCodes.NOT_FOUND).json({
    message: 'What are you looking for bruh'
  });
})

server.listen(PORT, () => {
  console.log(`http server listening on port ${PORT}`);
});

const gracefulShutdown = () => {
  console.log('Closing server!');
  server.close(async () => {
    server.closeAllConnections();
    console.log('Closed all connections!');
    await database.close()
    console.log('Closed connection to database!');
    process.exit(0);
  });
}

process.on('uncaughtException', gracefulShutdown);

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown);