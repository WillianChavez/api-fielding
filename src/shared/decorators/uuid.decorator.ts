import { Column, DataType } from 'sequelize-typescript';

export function UUID(target: any, propertyKey: string) {
  Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })(target, propertyKey);
}
