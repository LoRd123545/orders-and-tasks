import {
  Task,
  UpdateTaskDto,
  CreateTaskDto,
  TaskFindOptions,
} from '@app/types/tasks/index.js';

import tasksModel from '@app/models/tasks.model.js';

/**
 * @description Finds tasks that match the given filter options.
 * @param {TaskFindOptions} options
 * @returns {Promise<Task[]>} A promise that resolves to an array of found tasks.
 * @async
 */
const find = async (options: TaskFindOptions): Promise<Task[]> => {
  const tasks = await tasksModel.find(options);

  return tasks;
};

/**
 * @description Finds a task by its ID.
 * @param {string} id The ID of the task to find.
 * @returns {Promise<Task | null>} A promise that resolves to the found task if it exists, or null if it doesn't.
 * @async
 */
const findOne = async (id: string): Promise<Task | null> => {
  const task = await tasksModel.findOne(id);

  return task;
};

/**
 * @description Creates a new task with the given information.
 * @param task the information of the task to create
 * @returns the newly created task
 * @async
 */
const create = async (task: CreateTaskDto): Promise<Task> => {
  const newTask = await tasksModel.create(task);

  return newTask;
};

/**
 * @description Updates a task with the provided ID using the information from the new task.
 * @param {string} id The ID of the task to update.
 * @param {UpdateTaskDto} newTask The updated task information.
 * @returns {Promise<number>} A promise that resolves to the number of affected tasks.
 * @async
 */
const update = async (id: string, newTask: UpdateTaskDto): Promise<number> => {
  const task = await tasksModel.findOne(id);

  if (!task) {
    return 0;
  }

  const affectedCount = await tasksModel.update(id, {
    name: newTask.name || task.name,
    description: newTask.description || task.description,
    status: newTask.status || task.status,
    dueTo: newTask.dueTo || task.dueTo,
  });

  return affectedCount;
};

/**
 * @description Deletes a task with the given ID.
 * @param {string} id The ID of the task to delete.
 * @returns {Promise<number>} A promise that resolves to the number of removed tasks.
 * @async
 */
const remove = async (id: string): Promise<number> => {
  const removedCount = tasksModel.remove(id);

  return removedCount;
};

export default {
  find,
  findOne,
  create,
  update,
  remove,
};
