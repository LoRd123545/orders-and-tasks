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
  Task,
  UpdateTaskDto,
  CreateTaskDto,
  Status,
  TaskFindOptions,
} from '@app/types/tasks/index.js';
import { TaskFilters } from '@app/types/tasks/TaskFilters.js';
import { openSync } from 'fs';

@Table({
  tableName: 'tasks',
})
export class TaskModel extends Model<Task, InferCreationAttributes<TaskModel>> {
  @Attribute(DataTypes.UUID)
  @NotNull
  @PrimaryKey
  @Default(sql.uuidV4)
  declare id: CreationOptional<string>;

  @Attribute(DataTypes.STRING(50))
  @NotNull
  @Unique
  declare name: string;

  @Attribute(DataTypes.STRING(500))
  declare description: CreationOptional<string>;

  @Attribute(DataTypes.STRING(50))
  @NotNull
  @Default(Status.NOT_STARTED)
  declare status: CreationOptional<string>;

  @Attribute(DataTypes.DATE)
  declare dueTo: CreationOptional<Date>;

  @CreatedAt
  declare createdAt: CreationOptional<Date>;

  @UpdatedAt
  declare updatedAt: CreationOptional<Date>;
}

function getSequelizeWhere(where?: Partial<TaskFilters>) {
  const newWhere: Record<string, any> | undefined = where;

  const beginningOfTheMonth = new Date();
  beginningOfTheMonth.setUTCDate(1);

  const endOfTheMonth = new Date();
  endOfTheMonth.setUTCDate(28);

  if (!(where && newWhere)) {
    return undefined;
  }

  if (Array.isArray(where.status)) {
    const statuses = where.status;

    newWhere.status = {
      [Op.in]: statuses,
    };
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

  if (where.dueTo) {
    const dueTo = where.dueTo;

    if (!(typeof dueTo === 'string')) {
      const obj = {
        [Op.gte]: dueTo.start || beginningOfTheMonth.toISOString(),
        [Op.lte]: dueTo.end || endOfTheMonth.toISOString(),
      };

      newWhere.dueTo = obj;
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

const find = async (options: TaskFindOptions): Promise<Task[]> => {
  const page = options?.page || 0;
  const limit = options?.limit || 10;

  const newWhere = getSequelizeWhere(options.where);

  console.log(newWhere);

  const queryOptions: SequelizeFindOptions<Task> = {
    where: newWhere,
    order: [[options.orderBy || 'createdAt', options.sortBy || 'desc']],
    limit,
    offset: page * limit,
  };

  try {
    const result = await TaskModel.findAll(queryOptions);
    return result.map((task) => task.dataValues);
  } catch (err) {
    const message = 'Failed to find tasks';
    throw new DatabaseError(message, '', err, true);
  }
};

const findOne = async (id: string): Promise<Task | null> => {
  try {
    const result = await TaskModel.findOne({
      where: { id },
    });

    if (!result) {
      return null;
    }

    return result.dataValues;
  } catch (err) {
    const message = 'Failed to find task';
    throw new DatabaseError(message, '', err, true);
  }
};

const create = async (task: CreateTaskDto): Promise<Task> => {
  try {
    const result = await TaskModel.create(task);
    return result.dataValues;
  } catch (err) {
    const message = 'Failed to create task';
    throw new DatabaseError(message, '', err, true);
  }
};

const update = async (id: string, newTask: UpdateTaskDto): Promise<number> => {
  try {
    const [affectedCount] = await TaskModel.update(newTask, {
      where: { id },
    });

    return affectedCount;
  } catch (err) {
    const message = 'Failed to update task';
    throw new DatabaseError(message, '', err, true);
  }
};

const remove = async (id: string): Promise<number> => {
  try {
    const affectedCount = await TaskModel.destroy({
      where: { id },
    });

    return affectedCount;
  } catch (err) {
    const message = 'Failed to remove task';
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
