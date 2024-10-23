import { Router } from 'express';

import reportsController from '@app/controllers/reports.controller.js';

import middleware from '@app/middleware/index.js';

import {
  ReportComplexFiltersSchema,
  CreateReportSchema,
  ReportFiltersSchema,
  UpdateReportSchema,
  UuidSchema,
} from '@app/schemas/index.js';

const router = Router();

// GET / <- get all reports
router.get(
  '/',
  middleware.validateBySchema(ReportFiltersSchema, 'query'),
  reportsController.find
);

// GET /:id <- get one report
router.get(
  '/:id',
  middleware.validateBySchema(UuidSchema, 'params'),
  reportsController.findOne
);

// POST / <- create report
router.post(
  '/',
  middleware.validateBySchema(CreateReportSchema, 'body'),
  reportsController.create
);

// PATCH /:id <- update report
router.patch(
  '/:id',
  middleware.validateBySchema(UuidSchema, 'params'),
  middleware.validateBySchema(UpdateReportSchema, 'body'),
  reportsController.update
);

// DELETE /:id <- remove report
router.delete(
  '/:id',
  middleware.validateBySchema(UuidSchema, 'params'),
  reportsController.remove
);

export default router;
