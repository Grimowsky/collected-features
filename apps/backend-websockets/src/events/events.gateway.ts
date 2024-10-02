import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { PrismaService } from '../prisma.service';
import { Action as UserAction } from '@prisma/client';

@WebSocketGateway(4000, {
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server!: Server;

  constructor(private db: PrismaService) {}

  @SubscribeMessage('get-init-state')
  async getInitState(@MessageBody() userId: string): Promise<{
    likesCnt: number;
    lastUserAction: UserAction | null;
  }> {
    const likesCnt = await this.getLikesCnt();
    const lastAction = await this.getUserAction(userId);

    return { lastUserAction: lastAction, likesCnt };
  }

  @SubscribeMessage('like')
  async handleLike(
    @MessageBody() userId: string,
  ): Promise<{ lastUserAction: UserAction }> {
    await this.db.likes.upsert({
      where: { userId },
      update: { userId, action: UserAction.Like },
      create: { userId, action: UserAction.Like },
    });

    await this.emitLikesUpdate();

    return { lastUserAction: UserAction.Like };
  }

  @SubscribeMessage('dislike')
  async handleDislike(@MessageBody() userId: string) {
    await this.db.likes.upsert({
      where: { userId },
      update: { userId, action: UserAction.Dislike },
      create: { userId, action: UserAction.Dislike },
    });

    await this.emitLikesUpdate();

    return { lastUserAction: UserAction.Dislike };
  }

  private async emitLikesUpdate() {
    const cnt = await this.getLikesCnt();

    this.server.emit('update-likes', cnt);
  }

  private async getUserAction(userId: string): Promise<UserAction | null> {
    const user = await this.db.likes.findFirst({ where: { userId } });

    return user?.action || null;
  }

  private async getLikesCnt(): Promise<number> {
    return this.db.likes.count({ where: { action: 'Like' } });
  }
}
