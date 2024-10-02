import { Product } from "./Product.js"

export type CreateProductDto = Pick<Product, 'name' | 'category'> & Partial<Product>;