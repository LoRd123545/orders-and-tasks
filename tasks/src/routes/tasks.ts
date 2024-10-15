import { Router } from 'express';

import tasksController from '@app/controllers/tasks.controller.js';

const router = Router();

// GET / <- get all tasks
router.get('/', tasksController.find);

// GET /:id <- get one task
router.get('/:id', tasksController.findOne);

// POST /filters <- filter tasks
router.post('/filters', tasksController.filter);

// POST / <- create task
router.post('/', tasksController.create);

// PATCH /:id <- update task
router.patch('/:id', tasksController.update);

// DELETE /:id <- remove task
router.delete('/:id', tasksController.remove);

export default router;
