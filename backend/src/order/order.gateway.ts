/* eslint-disable prettier/prettier */
import { UseInterceptors } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayInit,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { WebSocketsInterceptor } from './websocketinterceptor/websocket.interceptor';

@WebSocketGateway()
@UseInterceptors(WebSocketsInterceptor)
export class OrderGateway implements OnGatewayInit {
  @WebSocketServer()
  server = new Server({
    cors: {
      origin: '*', // This is the client's origin
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  afterInit(server: any) {
    //
  }

  @SubscribeMessage('approveneworder')
  handleNewOrder(client: any, data: { id: number; idRestaurant: number }) {
    this.server.emit('approveneworder', data);
  }

  @SubscribeMessage('restaurantapprove')
  approveNewOrder(
    client: any,
    data: { idOrder: number; idRestaurant: number },
  ) {
    this.server.emit('restaurantapprove', data);
  }
}
