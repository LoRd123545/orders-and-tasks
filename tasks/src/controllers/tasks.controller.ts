import { Request, Response, NextFunction } from "express";

import tasksService from "@app/services/tasks.service.js";

import { httpCodes } from "@app/shared/index.js";

const find = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await tasksService.find();

    if (tasks.length === 0) {
      return res.sendStatus(httpCodes.EMPTY_RESPONE);
    }

    return res.json(tasks);
  } catch (err) {
    next(err);
  }
}

const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    const task = await tasksService.findOne(id);
    return res.json(task);
  } catch (err) {
    next(err);
  }
}

const create = async (req: Request, res: Response, next: NextFunction) => {
  const newTask = req.body;

  try {
    const task = await tasksService.create(newTask);
    res.status(httpCodes.CREATED_RESOURCE).json(task);
  } catch (err) {
    next(err);
  }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const newTask = req.body;

  try {
    await tasksService.update(id, newTask);
    res.sendStatus(httpCodes.CREATED_RESOURCE);
  } catch (err) {
    next(err);
  }
}

const remove = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    await tasksService.remove(id);
    res.sendStatus(httpCodes.OK);
  } catch (err) {
    next(err);
  }
}

export default {
  find,
  findOne,
  create,
  update,
  remove
}