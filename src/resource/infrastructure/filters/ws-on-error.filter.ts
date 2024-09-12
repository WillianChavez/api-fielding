import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  UnauthorizedException,
} from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';

@Catch()
export class WsOnErrorFilter extends BaseWsExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const client = host.switchToWs().getClient();

    if (
      exception instanceof BadRequestException ||
      exception instanceof UnauthorizedException
    ) {
      return client.emit('exception', {
        status: 'error',
        message: exception.message,
        response: exception.getResponse(),
      });
    }

    client.emit('exception', {
      status: 'error',
      message: 'Internal server error',
    });
  }
}
