import { Request, Response, NextFunction } from 'express';

import tasksService from '@app/services/tasks.service.js';

import { httpCodes } from '@app/shared/index.js';

const find = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await tasksService.find({
      limit: req.query.limit ? parseInt(req.query.limit.toString()) : undefined,
      offset: req.query.offset
        ? parseInt(req.query.offset.toString())
        : undefined,
      orderBy: req.query.orderBy?.toString(),
      sortBy: req.query.sortBy?.toString() === 'asc' ? 'asc' : 'desc',
      where: {
        dueTo: req.query.dueTo
          ? new Date(req.query.dueTo.toString())
          : undefined,
        description: req.query.description?.toString(),
        name: req.query.name?.toString(),
        status: req.query.status?.toString(),
      },
    });

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
  const newTask = req.body;

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
};
