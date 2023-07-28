import { CreateOrderDto } from '../dto/create-order.dto';
import { CreateOrderDetailDto } from '../../order-detail/dto/create-order-detail.dto';

export class CreateOrderWithDetailDto {
  order: CreateOrderDto;
  orderDetails: {idDish: number; price: number; quantity: number }[];
}