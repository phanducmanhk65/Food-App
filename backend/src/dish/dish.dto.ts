import { MinLength, IsNotEmpty, IsNumber } from 'class-validator';
import * as bcrypt from 'bcrypt';

export class Dish {
@IsNotEmpty()
productLine: string;

@IsNotEmpty()
name: string;

@IsNumber()
price: number;

@IsNumber()
idRestaurant: number;
}