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
import { User } from './user.entity/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcryptjs';
import { AuthService } from 'src/auth/auth.service';
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

  @Post()
  async create(@Body() user: User) {
    const createdUser = await this.userService.create(user);
    const token = await this.authService.generateToken(createdUser);
    const { password, ...userData } = createdUser;
    return { token, user: userData };
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
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = await this.userService.findByEmail(email);

    if (user && this.userService.comparePasswords(password, user.password)) {
      const token = await this.authService.generateToken(user);
      const { password, ...userData } = user;
      return { token, user: userData };
    }

    return {
      message: 'Không có',
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
      return user; // Return the entire user object, including the password field
    } else {
      return {
        message: 'Không tìm thấy người dùng',
      };
    }
  }
  @Put('profile/:id')
  async updateProFile(@Param('id') id: number, @Body() updatedUser: User) {
    const updatedUserProfile = await this.userService.updateProFile(
      id,
      updatedUser,
    );
    if (updatedUserProfile) {
      // Omitting the password field from the returned data
      const { ...userData } = updatedUserProfile;
      return userData;
    } else {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User not found',
      };
    }
  }
  @Delete('profile/:id')
  async deleteUserProfile(@Param('id') id: number) {
    const deleteResult = await this.userService.delete(id);
    if (deleteResult.affected === 1) {
      return {
        message: 'Profile deleted successfully',
      };
    } else {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User not found',
      };
    }
  }
}
