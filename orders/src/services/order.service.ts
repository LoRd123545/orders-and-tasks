import { Order, UpdateOrderDto, CreateOrderDto } from '@app/types/orders/index.js';

import ordersModel from '@app/models/order.model.js';

import { NotFoundError } from '@app/shared/errors/index.js';

import { channel } from '@app/index.js';

const { AMQP_EXCHANGE } = process.env;

const find = async (): Promise<Order[]> => {
  try {
    const orders = await ordersModel.find();
    return orders;
  } catch (err) {
    throw err;
  }
}

const findOne = async (id: string): Promise<Order> => {
  try {
    const order = await ordersModel.findOne(id);

    if (!order) {
      const message = 'Order not found!';
      const cause = `Order with id ${id} not found!`;

      throw new NotFoundError(message, '', cause, true);
    }

    return order;
  } catch (err) {
    throw err;
  }
}

const create = async (order: CreateOrderDto): Promise<Order> => {
  try {
    const newOrder = await ordersModel.create(order);

    const exchange = AMQP_EXCHANGE || 'orders';
    channel.publish(exchange, '', Buffer.from(JSON.stringify(newOrder)));

    return newOrder;
  } catch (err) {
    throw err;
  }
}

const update = async (id: string, newOrder: UpdateOrderDto): Promise<null> => {
  try {
    const order = await ordersModel.findOne(id);

    if (!order) {
      const message = 'Order not found!';
      const cause = `Order with id ${id} not found!`;

      throw new NotFoundError(message, '', cause, true);
    }

    ordersModel.update(id, {
      status: newOrder.status || order.status,
      email: newOrder.email || order.email,
      billingAddress: newOrder.billingAddress || order.billingAddress,
    });

    return null;
  } catch (err) {
    throw err;
  }
}

const remove = async (id: string): Promise<null> => {
  try {
    const order = await ordersModel.findOne(id);

    if (!order) {
      const message = 'Order not found!';
      const cause = `Order with id ${id} not found!`;

      throw new NotFoundError(message, '', cause, true);
    }

    ordersModel.remove(id);
    return null;
  } catch (err) {
    throw err;
  }
}

export default {
  find,
  findOne,
  create,
  update,
  remove,
}