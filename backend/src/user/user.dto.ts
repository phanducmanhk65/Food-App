import { MinLength, IsNotEmpty, IsNumber } from 'class-validator';
import * as bcrypt from 'bcrypt';

export class UserDto {
  @IsNotEmpty({ message: 'không được rỗng!!' })
  id: number;
  @IsNotEmpty({ message: 'không được rỗng!!' })
  username: string;

  @IsNotEmpty({ message: 'không được rỗng!!' })
  phone: string;

  @IsNotEmpty({ message: 'không được rỗng!!' })
  email: string;

  @MinLength(5, { message: 'Tối thiểu 5 ký tự!!!' })
  password: string;
  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }

  address: string;
}
