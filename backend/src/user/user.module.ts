/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './user.entity/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'your_secret_key', // Replace this with your own secret key
      signOptions: { expiresIn: '1h' }, // Set the token expiration time (optional)
    }),
  ],
  providers: [UserService, AuthService],
  controllers: [UserController],
  exports: [UserService], // Add UserService to exports
})
export class UserModule {}
