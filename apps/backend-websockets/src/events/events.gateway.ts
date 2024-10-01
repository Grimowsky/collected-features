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

  @SubscribeMessage('dislike')
  async handleDislike(@MessageBody() userId: string): Promise<void> {
    await this.db.likes.delete({ where: { userId } });

    await this.handleCount();
  }

  @SubscribeMessage('like')
  async handleLike(@MessageBody() userId: string): Promise<void> {
    await this.db.likes.create({ data: { userId: userId } });

    await this.handleCount();
  }

  @SubscribeMessage('likes-count')
  private async handleCount(): Promise<void> {
    const cnt = await this.db.likes.count();
    console.log('@@@@ likes count', cnt);

    this.server.emit('likes-count', cnt);
  }
}
