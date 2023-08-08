/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from '../user/entities/user.entity';
import { AuthService } from '../auth/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'userabc', // Replace this with your own secret key
      signOptions: { expiresIn: '5h' }, // Set the token expiration time (optional)
    }),
  ],
  providers: [UserService, AuthService],
  controllers: [UserController],
  exports: [UserService], // Add UserService to exports
})
export class UserModule {}
