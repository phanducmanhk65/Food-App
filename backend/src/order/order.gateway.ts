import { SubscribeMessage, WebSocketGateway, OnGatewayConnection, OnGatewayInit,WebSocketServer} from '@nestjs/websockets';
import { Server } from 'socket.io';


@WebSocketGateway()
export class OrderGateway implements OnGatewayInit{
  @WebSocketServer()
  server: Server;

  afterInit(server: any) {
//
  }
  
  @SubscribeMessage('approveneworder')
  handleNewOrder(client: any, data: {id: number, idRestaurant: number}) {
    this.server.emit('approveneworder', data);
  }
}
