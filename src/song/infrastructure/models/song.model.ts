import { UUID } from '@shared-decorators';
import {
  Column,
  CreatedAt,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'mnt_song', underscored: true })
export default class SongModel extends Model<SongModel> {
  @PrimaryKey
  @UUID
  id: string;

  @Column
  name: string;

  @Column
  artist: string;

  @Column
  album: string;

  @CreatedAt
  createdAt: Date;
}
