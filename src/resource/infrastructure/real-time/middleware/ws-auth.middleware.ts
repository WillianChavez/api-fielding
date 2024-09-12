import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import { Injectable } from '@shared-dependencies';
import { Socket } from 'socket.io';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class WsAuthMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async use(socket: Socket, next: (err?: Error) => void) {
    try {
      const token = this.extractTokenFromHeader(socket);

      if (!token) throw new WsException('Unauthorized');

      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET'),
      });

      socket.data.payload = payload;
      next();
    } catch (error) {
      next(new WsException('Unauthorized access to the socket'));
    }
  }

  private extractTokenFromHeader(socket: Socket) {
    const [type, token] =
      socket.handshake.headers.authorization?.split(' ') || [];

    return type === 'Bearer' ? token : null;
  }
}
