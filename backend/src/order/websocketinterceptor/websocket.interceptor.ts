/* eslint-disable prettier/prettier */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class WebSocketsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const client = context.switchToWs().getClient();
    const requestOrigin = client.handshake.headers.origin;

    // Set the allowed origin(s) for WebSocket connections
    const allowedOrigins = ['http://localhost:3001'];

    if (allowedOrigins.includes(requestOrigin)) {
      client.handshake.headers['Access-Control-Allow-Origin'] = requestOrigin;
      client.handshake.headers['Access-Control-Allow-Headers'] =
        'Content-Type, Authorization';
    }

    return next.handle();
  }
}
