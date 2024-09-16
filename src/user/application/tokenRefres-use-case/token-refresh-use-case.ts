// import { JwtPayload } from '@/shared/auth/interface/jwt-payload.interface';
// import { RefreshToken } from '@/user/domain/entities/refresh-token.entity';
// import { RefreshTokenRepository } from '@/user/domain/repositories/refreshToken.repository';

// export class RefreshTokenUseCase {
//   constructor(private tokenRepository: RefreshTokenRepository) {}

//   async execute(refreshTokenId: string): Promise<JwtPayload | null> {
//     const refreshToken =
//       await this.tokenRepository.findRefreshTokenById(refreshTokenId);

//     if (!refreshToken) {
//       return null;
//     }

//     const newToken = RefreshToken.create({
//       id: refreshToken.id,
//       user: refreshToken.userId,
//       exp: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
//     });
//     await this.tokenRepository.saveToken(newToken);

//     return newToken;
//   }
// }
