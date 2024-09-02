import { Injectable } from '@/shared/dependencies';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CryptService<T extends object> {
  constructor(private readonly jwtService: JwtService) {}

  async encrypt(payload: T, exp?: number | string): Promise<string> {
    return await this.jwtService.signAsync(payload, { expiresIn: exp });
  }

  async decrypt(token: string): Promise<T> {
    return await this.jwtService.verifyAsync(token);
  }
}
