/* eslint-disable prettier/prettier */
import { Entity,PrimaryGeneratedColumn, Column  } from "typeorm";

@Entity()
export class Order {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'id'
    })
    id: number;
    
    
    @Column({
        nullable:true
    })
    totalPrice: number;

    @Column({
        nullable:true
    })
    note: string;

    @Column({nullable: false})
    status: number;

    @Column({
        nullable:true
    })
    rate: number;

    @Column({nullable: true})
    idCustomer: number;

    @Column({nullable: true})
    idRestaurant: number;

    @Column({nullable: true})
    idShipper: number;

}