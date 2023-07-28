/* eslint-disable prettier/prettier */
import { User } from '../../user/user.entity/user.entity';
import { ProductLine } from '../../product-line/entities/product-line.entity';
import { Dish } from '../../dish/dish.entity/dish.entity';
import { Restaurant } from '../../restaurant/entities/restaurant.entity';
import { Order } from '../../order/entities/order.entity';
import { OrderDetail } from '../../order-detail/entities/order-detail.entity';
import { DeliverInfo } from '../../deliver-info/entities/deliver-info.entity';
const entities = [
  User,
  ProductLine,
  Dish,
  Restaurant,
  Order,
  OrderDetail,
  DeliverInfo,
];

export { User, ProductLine, Dish, Restaurant, Order, OrderDetail, DeliverInfo };
export default entities;
