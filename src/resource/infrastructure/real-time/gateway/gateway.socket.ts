import {
  OnModuleInit,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ActiveUserSocketDto } from './dto/active-user-socket.dto';
import { Server } from 'socket.io';
import { JoinUserActiveUseCase } from '@/resource/applitacion/join-user-active-use-case/join-user-active-use-case';
import { WsOnErrorFilter } from '../../filters/ws-on-error.filter';
import { AuthGuard } from '@nestjs/passport';

@WebSocketGateway()
@UseGuards(AuthGuard('jwt'))
export class GatewaySocket implements OnModuleInit {
  constructor(private readonly joinUserActiveUseCase: JoinUserActiveUseCase) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {}

  @UsePipes(new ValidationPipe())
  @UseFilters(new WsOnErrorFilter())
  @SubscribeMessage('joinWorkspace')
  async onJoinWorkspace(@MessageBody() user: ActiveUserSocketDto) {
    const { workspaceId } = user;
    const activeUsers = await this.joinUserActiveUseCase.run(user);
    this.server.to(workspaceId).emit('activeUsers', activeUsers);
  }
}
