import { Request, Response, NextFunction } from "express";

import ordersService from "@app/services/order.service.js";

import { httpCodes } from "@app/shared/index.js";

const find = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await ordersService.find();

    if (orders.length === 0) {
      res.sendStatus(httpCodes.EMPTY_RESPONE);
    }

    res.json(orders);
  } catch (err) {
    next(err);
  }
}

const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    const order = await ordersService.findOne(id);
    res.json(order);
  } catch (err) {
    next(err);
  }
}

const create = async (req: Request, res: Response, next: NextFunction) => {
  const newOrder = req.body;

  try {
    const order = await ordersService.create(newOrder);
    res.status(httpCodes.CREATED_RESOURCE).json(order);
  } catch (err) {
    next(err);
  }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const newOrder = req.body;

  try {
    await ordersService.update(id, newOrder);
    res.sendStatus(httpCodes.CREATED_RESOURCE);
  } catch (err) {
    next(err);
  }
}

const remove = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    await ordersService.remove(id);
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