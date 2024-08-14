import { Injectable } from 'src/shared/dependencies/injectable';
import { AuthService } from '../../domain/services/auth.service';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthenticateService extends AuthService {
  encryptPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }
}
