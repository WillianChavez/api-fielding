import { Injectable } from 'src/shared/dependencies/injectable';
import { AuthService } from '../../../user/domain/services/auth.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticateService extends AuthService {
  async encryptPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
