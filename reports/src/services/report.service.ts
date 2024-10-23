import {
  Report,
  CreateReportDto,
  UpdateReportDto,
} from '@app/types/reports/index.js';

import reportsModel from '@app/models/reports.model.js';

import { NotFoundError } from '@app/shared/errors/index.js';

const find = async (): Promise<Report[]> => {
  const reports = await reportsModel.find();

  return reports;
};

const findOne = async (id: string): Promise<Report | null> => {
  const report = await reportsModel.findOne(id);

  return report;
};

const create = async (report: CreateReportDto): Promise<Report> => {
  const newReport = await reportsModel.create(report);

  return newReport;
};

const update = async (
  id: string,
  newReport: UpdateReportDto
): Promise<number> => {
  const report = await reportsModel.findOne(id);

  if (!report) {
    return 0;
  }

  const affectedCount = await reportsModel.update(id, {
    name: newReport.name || report.name,
    description: newReport.description || report.description,
    data: newReport.data || report.data,
  });

  return affectedCount;
};

const remove = async (id: string): Promise<number> => {
  const removedCount = reportsModel.remove(id);

  return removedCount;
};

export default {
  find,
  findOne,
  create,
  update,
  remove,
};
