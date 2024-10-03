import { AppError } from '@app/shared/errors/index.js';
import amqp from 'amqplib';

const { AMQP_CONNECTION_STRING, AMQP_EXCHANGE } = process.env;
const connectionString = AMQP_CONNECTION_STRING || 'amqp://message-broker';

async function init() {
  try {
    const connection = await amqp.connect(connectionString);
    const channel = await connection.createChannel();
    console.log('Successfully connected to rabbitmq at port 5672!');
    const exchange = AMQP_EXCHANGE || 'orders';

    await channel.assertExchange(exchange, 'fanout', {
      durable: false,
    });

    return channel;
  } catch (err) {
    throw new AppError('Failed to connect to rabbitmq!', '', err, false);
  }
}

export default { init }