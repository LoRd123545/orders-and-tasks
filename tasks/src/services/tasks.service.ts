import {
  Task,
  UpdateTaskDto,
  CreateTaskDto,
  TaskFindOptions,
} from '@app/types/tasks/index.js';

import tasksModel from '@app/models/tasks.model.js';

import { NotFoundError } from '@app/shared/errors/index.js';

const find = async (options: TaskFindOptions): Promise<Task[]> => {
  try {
    console.log(options);
    const tasks = await tasksModel.find(options);
    return tasks;
  } catch (err) {
    throw err;
  }
};

const findOne = async (id: string): Promise<Task> => {
  try {
    const task = await tasksModel.findOne(id);

    if (!task) {
      const message = 'Task not found!';
      const cause = `Task with id ${id} not found!`;

      throw new NotFoundError(message, '', cause, true);
    }

    return task;
  } catch (err) {
    throw err;
  }
};

const create = async (task: CreateTaskDto): Promise<Task> => {
  try {
    const newTask = await tasksModel.create(task);
    return newTask;
  } catch (err) {
    throw err;
  }
};

const update = async (id: string, newTask: UpdateTaskDto): Promise<null> => {
  try {
    const task = await tasksModel.findOne(id);

    if (!task) {
      const message = 'Task not found!';
      const cause = `Task with id ${id} not found!`;

      throw new NotFoundError(message, '', cause, true);
    }

    tasksModel.update(id, {
      name: newTask.name || task.name,
      description: newTask.description || task.description,
      status: newTask.status || task.status,
      dueTo: newTask.dueTo || task.dueTo,
    });

    return null;
  } catch (err) {
    throw err;
  }
};

const remove = async (id: string): Promise<null> => {
  try {
    const task = await tasksModel.findOne(id);

    if (!task) {
      const message = 'Task not found!';
      const cause = `Task with id ${id} not found!`;

      throw new NotFoundError(message, '', cause, true);
    }

    tasksModel.remove(id);
    return null;
  } catch (err) {
    throw err;
  }
};

export default {
  find,
  findOne,
  create,
  update,
  remove,
};
