import { Router } from 'express';

import ordersController from '@app/controllers/orders.controller.js';

import middleware from '@app/middleware/index.js';

import {
  UuidSchema,
  OrderFiltersSchema,
  CreateOrderSchema,
  UpdateOrderSchema,
  OrderComplexFiltersSchema,
} from '@app/schemas/index.js';

const router = Router();

// GET / <- get all orders
router.get(
  '/',
  middleware.validateBySchema(OrderFiltersSchema, 'query'),
  ordersController.find
);

// GET /:id <- get one order
router.get(
  '/:id',
  middleware.validateBySchema(UuidSchema, 'params'),
  ordersController.findOne
);

// POST /filters <- filter orders
router.post(
  '/filters',
  middleware.validateBySchema(OrderComplexFiltersSchema, 'body'),
  ordersController.filter
);

// POST / <- create order
router.post(
  '/',
  middleware.validateBySchema(CreateOrderSchema, 'body'),
  ordersController.create
);

// PATCH /:id <- update order
router.patch(
  '/:id',
  middleware.validateBySchema(UuidSchema, 'params'),
  middleware.validateBySchema(UpdateOrderSchema, 'body'),
  ordersController.update
);

// DELETE /:id <- remove order
router.delete(
  '/:id',
  middleware.validateBySchema(UuidSchema, 'params'),
  ordersController.remove
);

export default router;
