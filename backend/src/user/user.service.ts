import { Injectable } from '@nestjs/common';
import { User } from './user.entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { UpdateResult, DeleteResult } from 'typeorm';
import * as bcrypt from 'bcryptjs';
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

  async findOne(id: number): Promise<User> {
    return await this.userRepo.findOne({ where: { id } });
  }

  async create(user: User): Promise<User> {
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    user.password = hashedPassword;
    return await this.userRepo.save(user);
  }

  async update(user: User): Promise<any> {
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    user.password = hashedPassword;
    return await this.userRepo.update(user.id, { ...user });
  }

  async delete(id): Promise<DeleteResult> {
    return await this.userRepo.delete(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepo.findOne({ where: { email } });
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
    const hashedPassword = bcrypt.hashSync(updatedUser.password, 10);
    updatedUser.password = hashedPassword;
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

  async deleteProfile(id: number): Promise<DeleteResult> {
    try {
      return await this.userRepo.delete(id);
    } catch (error) {
      return null;
    }
  }
}
