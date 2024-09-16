// import { RefreshTokenRepository } from '@/user/domain/repositories/refreshToken.repository';
// import { InjectModel } from '@nestjs/sequelize';
// import { Injectable } from 'src/shared/dependencies/injectable';
// import RefreshTokenModel from '../models/refreshToken.model';
// import { RefreshToken } from '@/user/domain/entities/refresh-token.entity';

// @Injectable()
// export class RelationalRefreshTokenRepository
//   implements RefreshTokenRepository
// {
//   constructor(
//     @InjectModel(RefreshTokenModel)
//     private refreshTokenModel: typeof RefreshTokenModel,
//   ) {}
//   async saveToken(token: string): Promise<void> {
//     await this.refreshTokenModel.create({ token });
//   }

//   async saveRefreshToken(
//     refreshToken: RefreshToken,
//     userId: string,
//   ): Promise<void> {
//     throw new Error('Method not implemented.');
//   }

//   async findToken(id: string): Promise<string | null> {
//     throw new Error('Method not implemented.');
//   }

//   async deleteToken(id: string): Promise<void> {
//     throw new Error('Method not implemented.');
//   }
// }
