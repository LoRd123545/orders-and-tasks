import { Request, Response, NextFunction } from 'express';

import productsService from '@app/services/product.service.js';

import { httpCodes } from '@app/shared/index.js';
import { HttpError } from '@app/shared/errors/HttpError.js';

const find = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await productsService.find();

    if (products.length === 0) {
      res.sendStatus(httpCodes.EMPTY_RESPONE);
    }

    res.json(products);
  } catch (err) {
    next(err);
  }
};

const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    const product = await productsService.findOne(id);

    if (!product) {
      throw new HttpError(
        'Product not found!',
        httpCodes.NOT_FOUND,
        null,
        true
      );
    }

    res.json(product);
  } catch (err) {
    next(err);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  const newProduct = req.body;

  try {
    const product = await productsService.create(newProduct);
    res.status(httpCodes.CREATED_RESOURCE).json(product);
  } catch (err) {
    next(err);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const newProduct = req.body;

  try {
    const affectedCount = await productsService.update(id, newProduct);

    if (affectedCount === 0) {
      throw new HttpError(
        'Product not found!',
        httpCodes.NOT_FOUND,
        null,
        true
      );
    }

    res.sendStatus(httpCodes.CREATED_RESOURCE);
  } catch (err) {
    next(err);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    const removedCount = await productsService.remove(id);

    if (removedCount === 0) {
      throw new HttpError(
        'Product not found!',
        httpCodes.NOT_FOUND,
        null,
        true
      );
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
};
