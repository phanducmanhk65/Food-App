/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcryptjs';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  [x: string]: any;
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  get(@Param() params) {
    return this.userService.findOne(params.id);
  }

  @Post('/signup')
  async create(@Body() user: CreateUserDto) {
    const createdUser = await this.userService.create(user);
    // const token = await this.authService.generateToken(createdUser);
    const {...userData } = createdUser;
    return {user: userData };
  }

  @Put(':id')
  update(@Body() user: User) {
    return this.userService.update(user);
  }

  @Delete(':id')
  deleteUser(@Param() params) {
    return this.userService.delete(params.id);
  }
  @Post('login')
  async loginUser(
    @Body('username') username: string,
    @Body('password') password: string,
    @Res() res: Response
  ) {
    const user = await this.userService.findByUsername(username);
    if(!user) {
      return "Không có tài khoản user này";
    }

    if (user && this.userService.comparePasswords(password, user.password)) {
      const token = await this.authService.generateToken(user);
      const { password, ...userData } = user;
      res.cookie('jwt', token, { httpOnly: true }); 
      return res.status(HttpStatus.OK).json({ token });    }

    return {
      message: 'Sai mật khẩu',
    };
  }
  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    return res.status(HttpStatus.OK).json({ message: 'Logout successful' });
  }

  @Get('profile/:id')
  async getUserProfile(@Param('id') id: number) {
    const user = await this.userService.findOne(id);
    if (user) {
      const { password, ...userData } = user;
      return userData;
    } else {
      return {
        message: 'Không tìm thấy người dùng',
      };
    }
  }
  @Put('profile/:id')
  async updateProFile(
    @Param('id') id: number,
    @Body() updatedUser: CreateUserDto,
  ) {
    const updatedUserProfile = await this.userService.updateProFile(
      id,
      updatedUser,
    );
    if (updatedUserProfile) {
      // Omitting the password field from the returned data
      const { id, ...userData } = updatedUserProfile;
      return userData;
    } else {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User not found',
      };
    }
  }
  
}
