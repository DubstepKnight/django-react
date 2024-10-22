import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CardService } from 'src/card/card.service';
import { ColumnService } from 'src/column/column.service';

@WebSocketGateway(3002)
export class BoardGateway {
  constructor(
    private readonly cardService: CardService,
    private readonly columnService: ColumnService,
  ) {}
  @WebSocketServer() server: Server;

  @SubscribeMessage('cards/edit')
  handleCardEdit(@MessageBody() data: string): string {
    return data;
  }

  @SubscribeMessage('cards/remove')
  handleCardRemove(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): string {
    console.log('nice');
    client.emit('cards', 'The image has been received');

    return data;
  }

  @SubscribeMessage('cards/add')
  handleCardAdd(data: string, @ConnectedSocket() client: Socket): string {
    client.emit('cards', 'The image has been received');

    return data;
  }
}
