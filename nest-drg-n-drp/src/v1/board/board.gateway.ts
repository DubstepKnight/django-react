import { UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtAuthGuard } from 'src/v1/auth/guards/jwt-auth.guard';
import { CardService } from 'src/v1/card/card.service';
import { ColumnService } from 'src/v1/column/column.service';
import { CardColumnPosition } from 'src/v1/types';

// @UseGuards(JwtAuthGuard)
@WebSocketGateway(3002, { cors: 'http://localhost:5173' })
export class BoardGateway {
  constructor(
    private readonly cardService: CardService,
    private readonly columnService: ColumnService,
  ) {}
  @WebSocketServer() server: Server;

  async handleConnection(client: Socket) {
    console.log('client got connected!');
    // Authenticate and authorize the client
    // client.user = await this.authService.verifyToken(client.handshake.query.token);
  }

  async handleDisconnect(client: Socket) {
    // Handle client disconnect
    console.log('client got disconnected!');
  }

  @SubscribeMessage('create_card')
  async handleCreateCard(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any,
  ) {
    console.log('create_card data: ', data);
    // Create card logic
    // Broadcast to other clients
    this.server.emit('create_card', data);
  }

  @SubscribeMessage('update_card')
  async handleUpdateCard(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any,
  ) {
    console.log('update_card data: ', data);
    // Update card logic
    // Broadcast to other clients
    this.server.emit('update_card', data);
  }

  @SubscribeMessage('move_card')
  async handleMoveCard(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: { oldPosition: CardColumnPosition; newPosition: CardColumnPosition },
  ) {
    try {
      console.log('move_card data: ', data);
      console.time('move_card');
      // Update card logic
      // Broadcast to other clients
      const oldCardPosition = data.oldPosition.cardIndex;
      const oldColumnPosition = data.oldPosition.columnIndex;

      const newCardPosition = data.newPosition.cardIndex;
      const newColumnPosition = data.newPosition.columnIndex;

      if (oldColumnPosition === newColumnPosition) {
        console.log('the same column');
        const column =
          await this.columnService.findByPosition(oldColumnPosition);
        const card = await this.cardService.findByPositionAndColumnId(
          oldCardPosition,
          column.id,
        );
        console.log('card: ', card);
        const result = await this.cardService.updateCardPosition(
          column.id,
          card.id,
          oldCardPosition,
          newCardPosition,
        );
        console.log('outer result: ', result);
        return result;
      }
      console.timeEnd('move_card');
      console.log('data: ', data);
      // this.server.emit('move_card', data);
    } catch (error) {
      throw new Error(`Failed to update card positions: ${error.message}`);
    }
  }
}
