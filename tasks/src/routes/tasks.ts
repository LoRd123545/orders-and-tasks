import { Router } from 'express';

import tasksController from '@app/controllers/tasks.controller.js';

import middleware from '@app/middleware/index.js';

import {
  CreateTaskSchema,
  UpdateTaskSchema,
  UuidSchema,
  TaskComplexFiltersSchema,
  TaskFiltersSchema,
} from '@app/schemas/index.js';

const router = Router();

// GET / <- get all tasks
router.get(
  '/',
  middleware.validateBySchema(TaskFiltersSchema, 'query'),
  tasksController.find
);

// GET /:id <- get one task
router.get(
  '/:id',
  middleware.validateBySchema(UuidSchema, 'params'),
  tasksController.findOne
);

// POST /filters <- filter tasks
router.post(
  '/filters',
  middleware.validateBySchema(TaskComplexFiltersSchema, 'body'),
  tasksController.filter
);

// POST / <- create task
router.post(
  '/',
  middleware.validateBySchema(CreateTaskSchema, 'body'),
  tasksController.create
);

// PATCH /:id <- update task
router.patch(
  '/:id',
  middleware.validateBySchema(UuidSchema, 'params'),
  middleware.validateBySchema(UpdateTaskSchema, 'body'),
  tasksController.update
);

// DELETE /:id <- remove task
router.delete(
  '/:id',
  middleware.validateBySchema(UuidSchema, 'params'),
  tasksController.remove
);

export default router;
