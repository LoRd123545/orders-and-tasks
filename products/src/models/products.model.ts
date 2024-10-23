import {
  Model,
  DataTypes,
  InferCreationAttributes,
  CreationOptional,
  sql,
} from '@sequelize/core';

import {
  Table,
  Attribute,
  NotNull,
  Default,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  Unique,
} from '@sequelize/core/decorators-legacy';

import { DatabaseError } from '@app/shared/errors/index.js';

import {
  Product,
  CreateProductDto,
  UpdateProductDto,
} from '@app/types/products/index.js';

@Table({
  tableName: 'products',
})
export class ProductModel extends Model<
  Product,
  InferCreationAttributes<ProductModel>
> {
  @Attribute(DataTypes.UUID)
  @NotNull
  @PrimaryKey
  @Default(sql.uuidV4)
  declare id: CreationOptional<string>;

  @Attribute(DataTypes.STRING(50))
  @NotNull
  @Unique
  declare name: string;

  @Attribute(DataTypes.STRING(500))
  declare description: CreationOptional<string>;

  @Attribute(DataTypes.STRING(100))
  @NotNull
  declare category: string;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  @Default(1)
  declare quantity: CreationOptional<number>;

  @CreatedAt
  declare createdAt: CreationOptional<Date>;

  @UpdatedAt
  declare updatedAt: CreationOptional<Date>;
}

const find = async (): Promise<Product[]> => {
  try {
    const result = await ProductModel.findAll();
    return result.map((product) => product.dataValues);
  } catch (err) {
    const message = 'Failed to find products';
    throw new DatabaseError(message, '', err, true);
  }
};

const findOne = async (id: string): Promise<Product | null> => {
  try {
    const result = await ProductModel.findOne({
      where: { id },
    });

    if (!result) {
      return null;
    }

    return result.dataValues;
  } catch (err) {
    const message = 'Failed to find product';
    throw new DatabaseError(message, '', err, true);
  }
};

const create = async (product: CreateProductDto): Promise<Product> => {
  try {
    const result = await ProductModel.create(product);
    return result.dataValues;
  } catch (err) {
    const message = 'Failed to create product';
    throw new DatabaseError(message, '', err, true);
  }
};

const update = async (
  id: string,
  newProduct: UpdateProductDto
): Promise<number> => {
  try {
    const [affectedCount] = await ProductModel.update(newProduct, {
      where: { id },
    });

    return affectedCount;
  } catch (err) {
    const message = 'Failed to update product';
    throw new DatabaseError(message, '', err, true);
  }
};

const remove = async (id: string): Promise<number> => {
  try {
    const removedCount = await ProductModel.destroy({
      where: { id },
    });

    return removedCount;
  } catch (err) {
    const message = 'Failed to remove product';
    throw new DatabaseError(message, '', err, true);
  }
};

export default {
  find,
  findOne,
  create,
  update,
  remove,
};
