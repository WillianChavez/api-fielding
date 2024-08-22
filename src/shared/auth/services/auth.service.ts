import { Injectable } from 'src/shared/dependencies/injectable';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from '../interface/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@/user/domain/services/user.service';

@Injectable()
export class AuthService extends UserService {
  constructor(private readonly jwtService: JwtService) {
    super();
  }
  async encryptPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
  generateToken(payload: JwtPayload): string {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
