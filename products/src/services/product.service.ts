import {
  Product,
  CreateProductDto,
  UpdateProductDto,
} from '@app/types/products/index.js';

import productsModel from '@app/models/products.model.js';

import { NotFoundError } from '@app/shared/errors/index.js';

const find = async (): Promise<Product[]> => {
  const products = await productsModel.find();

  return products;
};

const findOne = async (id: string): Promise<Product | null> => {
  const product = await productsModel.findOne(id);

  return product;
};

const create = async (product: CreateProductDto): Promise<Product> => {
  const newProduct = await productsModel.create(product);

  return newProduct;
};

const update = async (
  id: string,
  newProduct: UpdateProductDto
): Promise<number> => {
  const product = await productsModel.findOne(id);

  if (!product) {
    return 0;
  }

  const affectedCount = await productsModel.update(id, {
    name: newProduct.name || product.name,
    description: newProduct.description || product.description,
    category: newProduct.category || product.category,
    quantity: newProduct.quantity || product.quantity,
  });

  return affectedCount;
};

const remove = async (id: string): Promise<number> => {
  const removedCount = productsModel.remove(id);

  return removedCount;
};

export default {
  find,
  findOne,
  create,
  update,
  remove,
};
