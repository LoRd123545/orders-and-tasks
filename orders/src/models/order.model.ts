import {
  Model,
  DataTypes,
  InferCreationAttributes,
  CreationOptional, sql
} from '@sequelize/core';

import {
  Table,
  Attribute,
  NotNull,
  Default,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  Unique,
} from '@sequelize/core/decorators-legacy';

import { DatabaseError } from '@app/shared/errors/index.js';

import { Order, UpdateOrderDto, CreateOrderDto, Status } from '@app/types/orders/index.js';

@Table({
  tableName: 'orders',
})
export class OrderModel extends Model<Order, InferCreationAttributes<OrderModel>> {
  @Attribute(DataTypes.UUID)
  @NotNull
  @PrimaryKey
  @Default(sql.uuidV4)
  declare id: CreationOptional<string>

  @Attribute(DataTypes.UUID)
  @NotNull
  declare productID: string

  @Attribute(DataTypes.STRING(50))
  @NotNull
  @Default(Status.NOT_STARTED)
  declare status: CreationOptional<string>

  @Attribute(DataTypes.STRING(500))
  @NotNull
  declare email: string

  @Attribute(DataTypes.STRING(1000))
  @NotNull
  declare billingAddress: string

  @CreatedAt
  declare createdAt: CreationOptional<Date>

  @UpdatedAt
  declare updatedAt: CreationOptional<Date>
}

const find = async (): Promise<Order[]> => {
  try {
    const result = await OrderModel.findAll();
    return result.map((order) => order.dataValues);
  } catch (err) {
    const message = 'Failed to find orders'
    throw new DatabaseError(message, '', err, true);
  }
}

const findOne = async (id: string): Promise<Order | null> => {
  try {
    const result = await OrderModel.findOne({
      where: { id }
    });

    if (!result) {
      return null;
    }

    return result.dataValues;
  } catch (err) {
    const message = 'Failed to find order'
    throw new DatabaseError(message, '', err, true);
  }
}

const create = async (order: CreateOrderDto): Promise<Order> => {
  try {
    const result = await OrderModel.create(order);
    return result.dataValues;
  } catch (err) {
    const message = 'Failed to create order'
    throw new DatabaseError(message, '', err, true);
  }
}

const update = async (id: string, newOrder: UpdateOrderDto): Promise<null> => {
  try {
    await OrderModel.update(newOrder, {
      where: { id }
    });

    return null;
  } catch (err) {
    const message = 'Failed to update order'
    throw new DatabaseError(message, '', err, true);
  }
}

const remove = async (id: string): Promise<null> => {
  try {
    const result = await OrderModel.destroy({
      where: { id }
    });

    return null;
  } catch (err) {
    const message = 'Failed to remove order'
    throw new DatabaseError(message, '', err, true);
  }
}

export default {
  find,
  findOne,
  create,
  update,
  remove,
}