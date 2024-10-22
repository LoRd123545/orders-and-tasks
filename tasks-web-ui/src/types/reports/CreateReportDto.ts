import { Report } from './Report.ts';

export type CreateReportDto = Pick<Report, 'name' | 'data'> & Partial<Report>;
