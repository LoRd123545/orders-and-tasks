import {
  Model,
  DataTypes,
  InferCreationAttributes,
  CreationOptional,
  sql,
  FindOptions as SequelizeFindOptions,
  Op,
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

import {
  Order,
  UpdateOrderDto,
  CreateOrderDto,
  Status,
  OrderFindOptions,
  OrderFilters,
} from '@app/types/orders/index.js';

@Table({
  tableName: 'orders',
})
export class OrderModel extends Model<
  Order,
  InferCreationAttributes<OrderModel>
> {
  @Attribute(DataTypes.UUID)
  @NotNull
  @PrimaryKey
  @Default(sql.uuidV4)
  declare id: CreationOptional<string>;

  @Attribute(DataTypes.UUID)
  @NotNull
  declare productID: string;

  @Attribute(DataTypes.STRING(50))
  @NotNull
  @Default(Status.NOT_STARTED)
  declare status: CreationOptional<string>;

  @Attribute(DataTypes.STRING(500))
  @NotNull
  declare email: string;

  @Attribute(DataTypes.STRING(1000))
  @NotNull
  declare billingAddress: string;

  @CreatedAt
  declare createdAt: CreationOptional<Date>;

  @UpdatedAt
  declare updatedAt: CreationOptional<Date>;
}

function getSequelizeWhere(where?: Partial<OrderFilters>) {
  const newWhere: Record<string, any> | undefined = where;

  const beginningOfTheMonth = new Date();
  beginningOfTheMonth.setUTCDate(1);

  const endOfTheMonth = new Date();
  endOfTheMonth.setUTCDate(28);

  if (!(where && newWhere)) {
    return undefined;
  }

  if (where.createdAt) {
    const createdAt = where.createdAt;

    if (!(typeof createdAt === 'string')) {
      const obj = {
        [Op.gte]: createdAt.start || beginningOfTheMonth.toISOString(),
        [Op.lte]: createdAt.end || endOfTheMonth.toISOString(),
      };

      newWhere.createdAt = obj;
    }
  }

  if (where.updatedAt) {
    const updatedAt = where.updatedAt;

    if (!(typeof updatedAt === 'string')) {
      const obj = {
        [Op.gte]: updatedAt.start || beginningOfTheMonth.toISOString(),
        [Op.lte]: updatedAt.end || endOfTheMonth.toISOString(),
      };

      newWhere.updatedAt = obj;
    }
  }

  return newWhere;
}

const find = async (options: OrderFindOptions): Promise<Order[]> => {
  const page = options?.page || 0;
  const limit = options?.limit || 10;

  const newWhere = getSequelizeWhere(options.where);

  console.log(newWhere);

  const queryOptions: SequelizeFindOptions<Order> = {
    where: newWhere,
    order: [[options.orderBy || 'createdAt', options.sortBy || 'desc']],
    limit,
    offset: page * limit,
  };

  try {
    const result = await OrderModel.findAll(queryOptions);
    return result.map((order) => order.dataValues);
  } catch (err) {
    const message = 'Failed to find orders';
    throw new DatabaseError(message, '', err, true);
  }
};

const findOne = async (id: string): Promise<Order | null> => {
  try {
    const result = await OrderModel.findOne({
      where: { id },
    });

    if (!result) {
      return null;
    }

    return result.dataValues;
  } catch (err) {
    const message = 'Failed to find order';
    throw new DatabaseError(message, '', err, true);
  }
};

const create = async (order: CreateOrderDto): Promise<Order> => {
  try {
    const result = await OrderModel.create(order);
    return result.dataValues;
  } catch (err) {
    const message = 'Failed to create order';
    throw new DatabaseError(message, '', err, true);
  }
};

const update = async (
  id: string,
  newOrder: UpdateOrderDto
): Promise<number> => {
  try {
    const [affectedCount] = await OrderModel.update(newOrder, {
      where: { id },
    });

    return affectedCount;
  } catch (err) {
    const message = 'Failed to update order';
    throw new DatabaseError(message, '', err, true);
  }
};

const remove = async (id: string): Promise<number> => {
  try {
    const deletedCount = await OrderModel.destroy({
      where: { id },
    });

    return deletedCount;
  } catch (err) {
    const message = 'Failed to remove order';
    throw new DatabaseError(message, '', err, true);
  }
};

export default {
  find,
  findOne,
  create,
  update,
  remove,
};
