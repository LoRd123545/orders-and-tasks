import { Router } from 'express';

import productsController from '@app/controllers/products.controller.js';

import middleware from '@app/middleware/index.js';

import {
  ProductFiltersSchema,
  CreateProductSchema,
  ProductComplexFiltersSchema,
  UpdateProductSchema,
  UuidSchema,
} from '@app/schemas/index.js';

const router = Router();

// GET / <- get all products
router.get(
  '/',
  middleware.validateBySchema(ProductFiltersSchema, 'query'),
  productsController.find
);

// GET /:id <- get one product
router.get(
  '/:id',
  middleware.validateBySchema(UuidSchema, 'params'),
  productsController.findOne
);

// POST / <- create product
router.post(
  '/',
  middleware.validateBySchema(CreateProductSchema, 'body'),
  productsController.create
);

// PATCH /:id <- update product
router.patch(
  '/:id',
  middleware.validateBySchema(UuidSchema, 'params'),
  middleware.validateBySchema(UpdateProductSchema, 'body'),
  productsController.update
);

// DELETE /:id <- remove product
router.delete(
  '/:id',
  middleware.validateBySchema(UuidSchema, 'params'),
  productsController.remove
);

export default router;
