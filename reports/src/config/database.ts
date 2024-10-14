import { Sequelize } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';

import { ReportModel } from '@app/models/reports.model.js';

const { PGUSER, PGPASSWORD, PGHOST, PGDATABASE } = process.env;

const sequelize = new Sequelize({
  dialect: PostgresDialect,
  host: PGHOST,
  database: PGDATABASE,
  user: PGUSER,
  password: PGPASSWORD,
  models: [ReportModel]
});

export default sequelize;