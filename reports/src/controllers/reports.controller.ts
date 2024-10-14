import { Request, Response, NextFunction } from "express";

import reportsService from "@app/services/report.service.js";

import { httpCodes } from "@app/shared/index.js";

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
}

const findOne = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    const report = await reportsService.findOne(id);
    res.json(report);
  } catch (err) {
    next(err);
  }
}

const create = async (req: Request, res: Response, next: NextFunction) => {
  const newReport = req.body;

  try {
    const report = await reportsService.create(newReport);
    res.status(httpCodes.CREATED_RESOURCE).json(report);
  } catch (err) {
    next(err);
  }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const newReport = req.body;

  try {
    await reportsService.update(id, newReport);
    res.sendStatus(httpCodes.CREATED_RESOURCE);
  } catch (err) {
    next(err);
  }
}

const remove = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    await reportsService.remove(id);
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