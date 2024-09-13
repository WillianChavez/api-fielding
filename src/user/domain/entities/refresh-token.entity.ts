/* eslint-disable prettier/prettier */
import { v4 as uuidv4 } from 'uuid';

export interface RefreshTokenPrimitive {
  id: string;
  user: string;
  name?: string;
  exp: Date;
  token: string;
  isValide?: boolean;
}

export class RefreshToken {
  constructor(private attributes: RefreshTokenPrimitive) {}

  static create(data: {
    id?: string;
    user: string;
    name?: string;
    exp: Date;
    token: string;
    isValide?: boolean;
  }) {
    return new RefreshToken({
      id: data.id ?? uuidv4(),
      user: data.user,
      name: data.name ?? null,
      exp: data.exp,
      token: data.token,
      isValide: data.isValide ?? false,
    });
  }
}
