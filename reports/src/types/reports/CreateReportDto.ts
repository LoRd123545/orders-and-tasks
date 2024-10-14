import { Report } from "./Report.js"

export type CreateReportDto = Pick<Report, 'name' | 'data'> & Partial<Report>;