import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  totalPrice: number;

  @Column()
  note: string;

  @Column()
  status: string;

  @Column()
  rate: number;

  @Column({ unique: true })
  idCustomer: number;

  @Column({ unique: true })
  idRestaurant: number;

  @Column({ unique: true })
  idShipper: number;
}
