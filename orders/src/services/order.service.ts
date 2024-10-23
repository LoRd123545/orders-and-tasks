import {
  Order,
  UpdateOrderDto,
  CreateOrderDto,
  OrderFindOptions,
} from '@app/types/orders/index.js';

import ordersModel from '@app/models/order.model.js';

import { NotFoundError } from '@app/shared/errors/index.js';

import { channel } from '@app/index.js';

const { AMQP_EXCHANGE } = process.env;

const find = async (options: OrderFindOptions): Promise<Order[]> => {
  const orders = await ordersModel.find(options);

  return orders;
};

const findOne = async (id: string): Promise<Order | null> => {
  const order = await ordersModel.findOne(id);

  return order;
};

const create = async (order: CreateOrderDto): Promise<Order> => {
  const newOrder = await ordersModel.create(order);

  const exchange = AMQP_EXCHANGE || 'orders';
  channel.publish(exchange, '', Buffer.from(JSON.stringify(newOrder)));

  return newOrder;
};

const update = async (
  id: string,
  newOrder: UpdateOrderDto
): Promise<number> => {
  const order = await ordersModel.findOne(id);

  if (!order) {
    return 0;
  }

  const affectedCount = ordersModel.update(id, {
    status: newOrder.status || order.status,
    email: newOrder.email || order.email,
    billingAddress: newOrder.billingAddress || order.billingAddress,
  });

  return affectedCount;
};

const remove = async (id: string): Promise<number> => {
  const deletedCount = await ordersModel.remove(id);

  return deletedCount;
};

export default {
  find,
  findOne,
  create,
  update,
  remove,
};
