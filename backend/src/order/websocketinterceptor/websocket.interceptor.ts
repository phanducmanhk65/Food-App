import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class WebSocketsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const client = context.switchToWs().getClient();
    const requestOrigin = client.handshake.headers.origin;

    // Set the allowed origin(s) based on your requirements
    const allowedOrigins = ['http://localhost:3001', 'http://localhost:3000'];

    if (allowedOrigins.includes(requestOrigin)) {
      client.handshake.headers['Access-Control-Allow-Origin'] = requestOrigin;
    }

    return next.handle();
  }
}