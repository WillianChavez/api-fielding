import { UUID } from '@shared-decorators';
import {
  Column,
  DeletedAt,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'mnt_http_request',
  underscored: true,
  paranoid: true,
  timestamps: true,
})
export class HttpRequestModel extends Model<HttpRequestModel> {
  @PrimaryKey
  @UUID
  id: string;

  @Column
  methodId: string;

  @Column
  url: string;

  @DeletedAt
  deletedAt?: Date;
}
