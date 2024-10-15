import { Request, Response, NextFunction } from 'express';

import tasksService from '@app/services/tasks.service.js';

import { httpCodes } from '@app/shared/index.js';
import { CreateTaskDto } from '@app/types/tasks/CreateTaskDto.js';

const find = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await tasksService.find({ where: {} });

    if (tasks.length === 0) {
      res.sendStatus(httpCodes.EMPTY_RESPONE);
    }

    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

const filter = async (req: Request, res: Response, next: NextFunction) => {
  /**
   * filters schema:
   * {
   *  limit?: number,
   *  offset?: number,
   *  orderBy?: string,
   *  sortBy?: 'asc' | 'desc',
   *  where: {
   *    dueTo?: Date,
   *    description?: string,
   *    name?: string,
   *    status?: string,
   *  }
   * }
   */

  try {
    const tasks = await tasksService.find(req.body);

    if (tasks.length === 0) {
      res.sendStatus(httpCodes.EMPTY_RESPONE);
    }

    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    const task = await tasksService.findOne(id);
    res.json(task);
  } catch (err) {
    next(err);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  const newTask: CreateTaskDto = {
    name: req.body.name || `task-${Math.floor(Math.random() * 10000)}`,
    dueTo:
      req.body.dueTo ||
      new Date(Date.now() + 1000 * 60 * 60 * 24) /* current date + 1 day */,
  };

  try {
    const task = await tasksService.create(newTask);
    res.status(httpCodes.CREATED_RESOURCE).json(task);
  } catch (err) {
    next(err);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const newTask = req.body;

  try {
    await tasksService.update(id, newTask);
    res.sendStatus(httpCodes.CREATED_RESOURCE);
  } catch (err) {
    next(err);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    await tasksService.remove(id);
    res.sendStatus(httpCodes.OK);
  } catch (err) {
    next(err);
  }
};

export default {
  find,
  findOne,
  create,
  update,
  remove,
  filter,
};
