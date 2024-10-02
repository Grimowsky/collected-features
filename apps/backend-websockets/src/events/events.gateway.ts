import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { PrismaService } from '../prisma.service';

@WebSocketGateway(4000, {
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server!: Server;

  constructor(private db: PrismaService) {}

  @SubscribeMessage('get-count')
  async count(): Promise<number> {
    return this.db.likes.count();
  }

  @SubscribeMessage('dislike')
  async handleDislike(@MessageBody() userId: string): Promise<void> {
    const hasUserLiked = await this.hasLiked(userId);

    if (!hasUserLiked) {
      return;
    }

    await this.db.likes.delete({ where: { userId } });

    const cnt = await this.db.likes.count();

    this.server.emit('likes-count', cnt);
  }

  @SubscribeMessage('like')
  async handleLike(@MessageBody() userId: string): Promise<void> {
    if (await this.hasLiked(userId)) {
      return;
    }

    await this.db.likes.create({ data: { userId: userId } });
    const cnt = await this.db.likes.count();

    this.server.emit('likes-count', cnt);
  }

  private async hasLiked(userId: string) {
    return this.db.likes.findUnique({ where: { userId } });
  }
}
