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

import { Task, UpdateTaskDto, CreateTaskDto, Status } from '@app/types/tasks/index.js';

@Table({
  tableName: 'tasks',
})
export class TaskModel extends Model<Task, InferCreationAttributes<TaskModel>> {
  @Attribute(DataTypes.UUID)
  @NotNull
  @PrimaryKey
  @Default(sql.uuidV4)
  declare id: CreationOptional<string>

  @Attribute(DataTypes.STRING(50))
  @NotNull
  @Unique
  declare name: string

  @Attribute(DataTypes.STRING(500))
  declare description: CreationOptional<string>

  @Attribute(DataTypes.STRING(50))
  @NotNull
  @Default(Status.NOT_STARTED)
  declare status: CreationOptional<string>

  @Attribute(DataTypes.DATE)
  @Default((Date.now() + 60 * 60 * 24)) // current date + 1 day
  declare dueTo: CreationOptional<Date>

  @CreatedAt
  declare createdAt: CreationOptional<Date>

  @UpdatedAt
  declare updatedAt: CreationOptional<Date>
}

const find = async (): Promise<Task[]> => {
  try {
    const result = await TaskModel.findAll();
    return result.map((task) => task.dataValues);
  } catch (err) {
    const message = 'Failed to find tasks'
    throw new DatabaseError(message, '', err, true);
  }
}

const findOne = async (id: string): Promise<Task | null> => {
  try {
    const result = await TaskModel.findOne({
      where: { id }
    });

    if (!result) {
      return null;
    }

    return result.dataValues;
  } catch (err) {
    const message = 'Failed to find task'
    throw new DatabaseError(message, '', err, true);
  }
}

const create = async (task: CreateTaskDto): Promise<Task> => {
  try {
    const result = await TaskModel.create(task);
    return result.dataValues;
  } catch (err) {
    const message = 'Failed to create task'
    throw new DatabaseError(message, '', err, true);
  }
}

const update = async (id: string, newTask: UpdateTaskDto): Promise<null> => {
  try {
    await TaskModel.update(newTask, {
      where: { id }
    });

    return null;
  } catch (err) {
    const message = 'Failed to update task'
    throw new DatabaseError(message, '', err, true);
  }
}

const remove = async (id: string): Promise<null> => {
  try {
    const result = await TaskModel.destroy({
      where: { id }
    });

    return null;
  } catch (err) {
    const message = 'Failed to remove task'
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