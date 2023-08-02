/* eslint-disable prettier/prettier */
import {NestMiddleware, Injectable, HttpException, HttpStatus} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import * as jwtoken from 'jsonwebtoken';

export class LoginMiddleware implements NestMiddleware {
    constructor(private jwtService: JwtService) {}

  async use(req: any, res: Response, next: NextFunction) {
    const token = req.cookies['jwt'];
  
    if(!token) {
      throw new HttpException('Chưa đăng nhập', HttpStatus.UNAUTHORIZED);
        }
    else if (token) {
      const jwtToken = token;

      try {
        const decoded =  jwtoken.verify(token, "userabc");
        const d = jwtoken.decode(token);
        
          
        req.user = decoded; 
        
        // Set the user object on the request
      } catch (err) {
        throw new HttpException(err.message + token, HttpStatus.UNAUTHORIZED);
      }

    } 
    next();
  }
  }
    
