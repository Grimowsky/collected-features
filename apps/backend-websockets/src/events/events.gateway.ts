import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(4000, {
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server!: Server;

  @SubscribeMessage('hello-world')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }
}
