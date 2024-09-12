import {
  OnModuleInit,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ActiveUserSocketDto } from './dto/active-user-socket.dto';
import { JoinUserActiveUseCase } from '@/resource/applitacion/join-user-active-use-case/join-user-active-use-case';
import { ListUsersActiveUseCase } from '@/resource/applitacion/list-users-active-use-case/list-users-active-use-case';
import { RemoveUserActiveUseCase } from '@/resource/applitacion/remove-user-active-use-case/remove-user-active-use-case';
import { Server, Socket } from 'socket.io';
import { WsOnErrorFilter } from '../../filters/ws-on-error.filter';
import { WsAuthMiddleware } from '../middleware/ws-auth.middleware';

@WebSocketGateway()
@UsePipes(new ValidationPipe())
export class GatewaySocket implements OnModuleInit {
  constructor(
    private readonly joinUserActiveUseCase: JoinUserActiveUseCase,
    private readonly listUsersActiveUseCase: ListUsersActiveUseCase,
    private readonly removeUserActiveUseCase: RemoveUserActiveUseCase,
    private readonly wsAuthMiddleware: WsAuthMiddleware,
  ) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.use(this.wsAuthMiddleware.use.bind(this.wsAuthMiddleware));
    this.server.on('connection', (socket) => {
      socket.on('disconnect', async () => {
        await this.handleDisconnect(socket);
      });
    });
  }

  @UseFilters(new WsOnErrorFilter())
  @SubscribeMessage('joinWorkspace')
  async onJoinWorkspace(
    @MessageBody() user: ActiveUserSocketDto,
    @ConnectedSocket() socket,
  ) {
    const { workspaceId } = user;
    socket.join(workspaceId);
    socket.data.user = user;
    await this.joinUserActiveUseCase.run(user);
    const activeUsers = await this.listUsersActiveUseCase.run({ workspaceId });
    this.server.to(workspaceId).emit('active-users', activeUsers);
  }

  private async handleDisconnect(socket: Socket) {
    const user = socket.data.user;

    if (!user) return socket.disconnect();

    const { id, workspaceId } = socket.data.user;
    await this.removeUserActiveUseCase.run({ id, workspaceId });
    const activeUsers = await this.listUsersActiveUseCase.run({ workspaceId });
    this.server.to(workspaceId).emit('active-users', activeUsers);

    socket.disconnect();
  }
}
