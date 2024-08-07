import {
  Column,
  CreatedAt,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'mnt_song', underscored: true })
export default class SongModel extends Model<SongModel> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
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
