// // application/use-cases/create-tokens.use-case.ts
// export class CreateTokenUseCase {
//   constructor(private tokenRepository: ITokenRepository) {}

//   async execute(
//     userId: string,
//   ): Promise<{ token: Token; refreshToken: RefreshToken }> {
//     const token = new Token(uuidv4(), userId, new Date(Date.now() + 3600000)); // 1 hora
//     const refreshToken = new RefreshToken(
//       uuidv4(),
//       userId,
//       new Date(Date.now() + 604800000),
//     ); // 1 semana

//     await this.tokenRepository.saveToken(token);
//     await this.tokenRepository.saveRefreshToken(refreshToken);

//     return { token, refreshToken };
//   }
// }

// // application/use-cases/refresh-token.use-case.ts
// export class RefreshTokenUseCase {
//   constructor(private tokenRepository: ITokenRepository) {}

//   async execute(refreshTokenId: string): Promise<Token | null> {
//     const refreshToken =
//       await this.tokenRepository.findRefreshTokenById(refreshTokenId);

//     if (!refreshToken || refreshToken.expiresAt < new Date()) {
//       return null;
//     }

//     const newToken = new Token(
//       uuidv4(),
//       refreshToken.userId,
//       new Date(Date.now() + 3600000),
//     );
//     await this.tokenRepository.saveToken(newToken);

//     return newToken;
//   }
// }
