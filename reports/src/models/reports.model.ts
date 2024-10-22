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
  Report,
  CreateReportDto,
  UpdateReportDto,
} from '@app/types/reports/index.js';

@Table({
  tableName: 'reports',
})
export class ReportModel extends Model<
  Report,
  InferCreationAttributes<ReportModel>
> {
  @Attribute(DataTypes.UUID)
  @NotNull
  @PrimaryKey
  @Default(sql.uuidV4)
  declare id: CreationOptional<string>;

  @Attribute(DataTypes.STRING(50))
  @NotNull
  declare name: string;

  @Attribute(DataTypes.STRING(500))
  declare description: CreationOptional<string>;

  @Attribute(DataTypes.JSONB)
  @NotNull
  declare data: Record<string, any>;

  @CreatedAt
  declare createdAt: CreationOptional<Date>;

  @UpdatedAt
  declare updatedAt: CreationOptional<Date>;
}

const find = async (): Promise<Report[]> => {
  try {
    const result = await ReportModel.findAll();
    return result.map((report) => report.dataValues);
  } catch (err) {
    const message = 'Failed to find reports';
    throw new DatabaseError(message, '', err, true);
  }
};

const findOne = async (id: string): Promise<Report | null> => {
  try {
    const result = await ReportModel.findOne({
      where: { id },
    });

    if (!result) {
      return null;
    }

    return result.dataValues;
  } catch (err) {
    const message = 'Failed to find report';
    throw new DatabaseError(message, '', err, true);
  }
};

const create = async (report: CreateReportDto): Promise<Report> => {
  try {
    const result = await ReportModel.create(report);
    return result.dataValues;
  } catch (err) {
    const message = 'Failed to create report';
    throw new DatabaseError(message, '', err, true);
  }
};

const update = async (
  id: string,
  newReport: UpdateReportDto
): Promise<null> => {
  try {
    await ReportModel.update(newReport, {
      where: { id },
    });

    return null;
  } catch (err) {
    const message = 'Failed to update report';
    throw new DatabaseError(message, '', err, true);
  }
};

const remove = async (id: string): Promise<null> => {
  try {
    await ReportModel.destroy({
      where: { id },
    });

    return null;
  } catch (err) {
    const message = 'Failed to remove report';
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
