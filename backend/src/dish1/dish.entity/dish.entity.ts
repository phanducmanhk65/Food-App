import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Dish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  productline: string;

  @Column()
  restaurant: string;

  @Column()
  status: boolean;
  orders: any;
}
