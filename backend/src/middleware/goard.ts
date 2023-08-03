/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import * as jwtoken from 'jsonwebtoken';


@Injectable()
export class Goard implements CanActivate {
     canActivate(context: ExecutionContext ) : boolean {
        const request = context.switchToHttp().getRequest();
        const token = request.cookies['jwt'];
        const decodeToken = jwtoken.decode(token,{ complete: true });
        request.idUser = decodeToken.payload['userId'];
        if(request.params.id) {
        const idFromRoute = +request.params.id;

        // Compare the "id" parameter with the "idUser" from the token
        if (idFromRoute != request.idUser) {
          throw new ForbiddenException('Bạn không có quyền truy cập vào đây');
        }
      }
        return true;
     }
    
}