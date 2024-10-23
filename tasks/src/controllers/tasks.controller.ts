import { Request, Response, NextFunction } from 'express';

import tasksService from '@app/services/tasks.service.js';

import { httpCodes } from '@app/shared/index.js';
import { CreateTaskDto } from '@app/types/tasks/CreateTaskDto.js';
import { HttpError } from '@app/shared/errors/HttpError.js';

const find = async (req: Request, res: Response, next: NextFunction) => {
  const { limit, page, sortBy, orderBy } = req.query;

  console.log(req.query);

  try {
    const tasks = await tasksService.find({
      limit: limit ? parseInt(limit.toString()) : 10,
      page: page ? parseInt(page.toString()) : 0,
      sortBy: sortBy?.toString() === 'asc' ? 'asc' : 'desc',
      orderBy: orderBy?.toString(),
    });

    if (tasks.length === 0) {
      res.sendStatus(httpCodes.EMPTY_RESPONE);
    }

    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

const filter = async (req: Request, res: Response, next: NextFunction) => {
  const filters = req.body;
  try {
    const tasks = await tasksService.find(filters);

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

    if (!task) {
      throw new HttpError('Task not found!', httpCodes.NOT_FOUND, null, true);
    }

    res.json(task);
  } catch (err) {
    next(err);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  const newTask: CreateTaskDto = {
    name: req.body.name || `task-${Math.floor(Math.random() * 10000)}`,
    dueTo: req.body.dueTo
      ? new Date(req.body.dueTo)
      : new Date(Date.now() + 1000 * 60 * 60 * 24) /* current date + 1 day */,
    status: req.body.status,
    description: req.body.description,
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
    const affectedCount = await tasksService.update(id, newTask);

    if (affectedCount === 0) {
      throw new HttpError('Task not found!', httpCodes.NOT_FOUND, null, true);
    }

    res.sendStatus(httpCodes.CREATED_RESOURCE);
  } catch (err) {
    next(err);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    const affectedCount = await tasksService.remove(id);

    if (affectedCount === 0) {
      throw new HttpError('Task not found!', httpCodes.NOT_FOUND, null, true);
    }

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
