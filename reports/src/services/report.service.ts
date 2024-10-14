import { Report, CreateReportDto, UpdateReportDto } from '@app/types/reports/index.js';

import reportsModel from '@app/models/reports.model.js';

import { NotFoundError } from '@app/shared/errors/index.js';

const find = async (): Promise<Report[]> => {
  try {
    const reports = await reportsModel.find();
    return reports;
  } catch (err) {
    throw err;
  }
}

const findOne = async (id: string): Promise<Report> => {
  try {
    const report = await reportsModel.findOne(id);

    if (!report) {
      const message = 'Report not found!';
      const cause = `Report with id ${id} not found!`;

      throw new NotFoundError(message, '', cause, true);
    }

    return report;
  } catch (err) {
    throw err;
  }
}

const create = async (report: CreateReportDto): Promise<Report> => {
  try {
    const newReport = await reportsModel.create(report);
    return newReport;
  } catch (err) {
    throw err;
  }
}

const update = async (id: string, newReport: UpdateReportDto): Promise<null> => {
  try {
    const report = await reportsModel.findOne(id);

    if (!report) {
      const message = 'Report not found!';
      const cause = `Report with id ${id} not found!`;

      throw new NotFoundError(message, '', cause, true);
    }

    reportsModel.update(id, {
      name: newReport.name || report.name,
      description: newReport.description || report.description,
      data: newReport.data || report.data,
    });

    return null;
  } catch (err) {
    throw err;
  }
}

const remove = async (id: string): Promise<null> => {
  try {
    const report = await reportsModel.findOne(id);

    if (!report) {
      const message = 'Report not found!';
      const cause = `Report with id ${id} not found!`;

      throw new NotFoundError(message, '', cause, true);
    }

    reportsModel.remove(id);
    return null;
  } catch (err) {
    throw err;
  }
}

export default {
  find,
  findOne,
  create,
  update,
  remove,
}