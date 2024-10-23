import { Request, Response, NextFunction } from 'express';

import reportsService from '@app/services/report.service.js';

import { httpCodes } from '@app/shared/index.js';
import { HttpError } from '@app/shared/errors/HttpError.js';

const find = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reports = await reportsService.find();

    if (reports.length === 0) {
      res.sendStatus(httpCodes.EMPTY_RESPONE);
    }

    res.json(reports);
  } catch (err) {
    next(err);
  }
};

const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    const report = await reportsService.findOne(id);

    if (!report) {
      throw new HttpError('Report not found!', httpCodes.NOT_FOUND, null, true);
    }

    res.json(report);
  } catch (err) {
    next(err);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  const newReport = req.body;

  try {
    const report = await reportsService.create(newReport);
    res.status(httpCodes.CREATED_RESOURCE).json(report);
  } catch (err) {
    next(err);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const newReport = req.body;

  try {
    const affectedCount = await reportsService.update(id, newReport);

    if (affectedCount === 0) {
      throw new HttpError('Report not found!', httpCodes.NOT_FOUND, null, true);
    }

    res.sendStatus(httpCodes.CREATED_RESOURCE);
  } catch (err) {
    next(err);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    const removedCount = await reportsService.remove(id);

    if (removedCount === 0) {
      throw new HttpError('Report not found!', httpCodes.NOT_FOUND, null, true);
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
