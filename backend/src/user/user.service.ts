/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { UpdateResult, DeleteResult } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
@Injectable()
export class UserService {
  [x: string]: any;
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepo.find();
  }

  findByUsername(username: string) {
    return this.userRepo.createQueryBuilder('user').where('username = :username', {username: username}).getOne();
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepo.findOne({ where: { id } });
  }

  async create(user: CreateUserDto){
    const duplicateUser = await this.userRepo.createQueryBuilder('user').where('username = :username', {username: user.username}).getOne();
    if(duplicateUser) {
      return {message: "Username đã tồn tại"};
    } else {
      const hashedPassword = bcrypt.hashSync(user.password, 10);
    user.password = hashedPassword;
    return await this.userRepo.save(user);
    }
    
  }

  async update(user: User): Promise<any> {
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    user.password = hashedPassword;
    return await this.userRepo.update(user.id, { ...user });
  }

  async delete(id): Promise<DeleteResult> {
    return await this.userRepo.delete(id);
  }

  async findById(id: number): Promise<User | null> {
    const user = await this.userRepo.findOne({ where: { id } });
    return user || null;
  }
  comparePasswords(enteredPassword: string, storedPassword: string): boolean {
    if (!enteredPassword || !storedPassword) {
      return false;
    }
    return bcrypt.compareSync(enteredPassword, storedPassword);
  }

  async updateProFile(id: number, updatedUser: User): Promise<User | null> {
    const existingUser = await this.userRepo.findOne({ where: { id } });

    if (!existingUser) {
      return null;
    }

    // Update only the provided properties
    Object.assign(existingUser, updatedUser);

    try {
      const updatedUserProfile = await this.userRepo.save(existingUser);
      return updatedUserProfile;
    } catch (error) {
      return null;
    }
  }

  async updateUserProfile(id: number, updatedUser: User): Promise<User | null> {
    const existingUser = await this.userRepo.findOne({ where: { id } });

    if (!existingUser) {
      return null;
    }

    // Update only the provided properties
    Object.assign(existingUser, updatedUser);

    try {
      const updatedUserProfile = await this.userRepo.save(existingUser);
      return updatedUserProfile;
    } catch (error) {
      return null;
    }
  }
}
