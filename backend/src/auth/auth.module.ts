// auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from '../user/user.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      // JWT configuration
    }),
  ],
  providers: [JwtStrategy, UserService],
  exports: [JwtModule],
})
export class AuthModule {}
