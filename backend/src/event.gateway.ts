import { WebSocketGateway, WebSocketServer,MessageBody, SubscribeMessage, } from "@nestjs/websockets";
import {Socket, Server} from 'socket.io';
import { OnModuleInit } from "@nestjs/common/interfaces";
@WebSocketGateway()
export class EventGateway implements OnModuleInit {
    @WebSocketServer()
    server: Server;

    onModuleInit() {
        this.server.on('connection', (socket) => {
           console.log(socket.id);
           console.log("Connect!");  
        })
    } 

    @SubscribeMessage('events')
    handleEvent(@MessageBody() data: any) {
        console.log(data);
        this.server.emit('onMessage', {
            msg: 'New Mes',
            content: data
        });
    }
}