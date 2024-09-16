import { v4 as uuidv4 } from 'uuid';
export interface RefreshTokenPrimitive {
  id: string;
  user: string;
  name?: string;
  exp: Date;
  token?: string;
  isValid?: boolean;
}

export class RefreshToken {
  constructor(private attributes: RefreshTokenPrimitive) {}

  static create(data: {
    id: string;
    user: string;
    name?: string;
    exp: Date;
    token: string;
    isValid?: boolean;
  }): RefreshToken {
    return new RefreshToken({
      id: data.id ?? uuidv4(),
      user: data.user,
      name: data.name,
      exp: data.exp,
      token: data.token ?? null,
      isValid: data.isValid ?? false,
    });
  }
}
