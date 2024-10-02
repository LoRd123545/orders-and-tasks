import { Sequelize } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';

import { ProductModel } from '@app/models/products.model.js';

const { PGUSER, PGPASSWORD, PGHOST, PGDATABASE } = process.env;

const sequelize = new Sequelize({
  dialect: PostgresDialect,
  host: PGHOST,
  database: PGDATABASE,
  user: PGUSER,
  password: PGPASSWORD,
  models: [ProductModel]
});

export default sequelize;