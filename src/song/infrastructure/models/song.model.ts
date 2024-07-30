import {
  Column,
  CreatedAt,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'mnt_song', underscored: true })
export class Song extends Model<Song> {
  @PrimaryKey
  @Column(DataType.UUIDV4)
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
