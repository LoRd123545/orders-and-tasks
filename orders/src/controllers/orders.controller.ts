import { Request, Response, NextFunction } from 'express';

import ordersService from '@app/services/order.service.js';

import { httpCodes } from '@app/shared/index.js';
import { HttpError } from '@app/shared/errors/HttpError.js';

const find = async (req: Request, res: Response, next: NextFunction) => {
  const { limit, page, sortBy, orderBy } = req.query;

  try {
    const orders = await ordersService.find({
      limit: limit ? parseInt(limit.toString()) : 10,
      page: page ? parseInt(page.toString()) : 0,
      sortBy: sortBy?.toString() === 'asc' ? 'asc' : 'desc',
      orderBy: orderBy?.toString(),
    });

    if (orders.length === 0) {
      res.sendStatus(httpCodes.EMPTY_RESPONE);
    }

    res.json(orders);
  } catch (err) {
    next(err);
  }
};

const filter = async (req: Request, res: Response, next: NextFunction) => {
  const filters = req.body;

  try {
    const orders = await ordersService.find(filters);

    if (orders.length === 0) {
      res.sendStatus(httpCodes.EMPTY_RESPONE);
    }

    res.json(orders);
  } catch (err) {
    next(err);
  }
};

const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    const order = await ordersService.findOne(id);

    if (!order) {
      throw new HttpError('order not found!', httpCodes.NOT_FOUND, null, true);
    }

    res.json(order);
  } catch (err) {
    next(err);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  const newOrder = req.body;

  try {
    const order = await ordersService.create(newOrder);
    res.status(httpCodes.CREATED_RESOURCE).json(order);
  } catch (err) {
    next(err);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const newOrder = req.body;

  try {
    const affectedCount = await ordersService.update(id, newOrder);

    if (affectedCount === 0) {
      throw new HttpError('order not found!', httpCodes.NOT_FOUND, null, true);
    }

    res.sendStatus(httpCodes.CREATED_RESOURCE);
  } catch (err) {
    next(err);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    const removedCount = await ordersService.remove(id);

    if (removedCount === 0) {
      throw new HttpError('order not found!', httpCodes.NOT_FOUND, null, true);
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
