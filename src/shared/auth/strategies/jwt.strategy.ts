import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interface/jwt-payload.interface';
import { InjectModel } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import UserModel from '@/user/infrastructure/models/user.model';
import { UnauthorizedException } from '@nestjs/common';
import { Injectable } from '@/shared/dependencies';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(UserModel)
    private readonly userModel: typeof UserModel,
    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<UserModel> {
    const { id } = payload;
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new UnauthorizedException('Token not valid');
    }
    return user;
  }
}
