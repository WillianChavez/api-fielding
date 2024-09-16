import { RefreshToken } from '../entities/refresh-token.entity';

export abstract class RefreshTokenRepository {
  saveToken: (token: RefreshToken) => Promise<void>;
  saveRefreshToken: (
    refreshToken: RefreshToken,
    userId: string,
  ) => Promise<void>;
  findRefreshTokenById: (id: string) => Promise<string | null>;
  deleteToken: (id: string) => Promise<void>;
}
