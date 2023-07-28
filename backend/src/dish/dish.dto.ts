import { MinLength, IsNotEmpty, IsNumber } from 'class-validator';
import * as bcrypt from 'bcrypt';

export class Dish {
  @IsNotEmpty({ message: 'không được rỗng!!' })
  id: number;
  @IsNotEmpty({ message: 'không được rỗng!!' })
  name: string;
  @IsNotEmpty({ message: 'không được rỗng!!' })
  price: number;
  @IsNotEmpty({ message: 'không được rỗng!!' })
  productline: string;
  @IsNotEmpty({ message: 'không được rỗng!!' })
  restaurant: string;
  @IsNotEmpty({ message: 'không được rỗng!!' })
  status: boolean;
  orders: any;
}
