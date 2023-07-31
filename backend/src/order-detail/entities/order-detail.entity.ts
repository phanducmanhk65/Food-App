import { Entity,PrimaryGeneratedColumn, Column  } from "typeorm";

@Entity()
export class OrderDetail {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'id'
    })
    id: number;
    
    @Column({
        nullable:false
    })
    idOrder: number;
    
    @Column({
        nullable:true
    })
    idDish: number;

    @Column({
        nullable:true
    })
    price: number;

    @Column({
        nullable:true
    })
    quantity: number;

    @Column({nullable:true})
    imageUrl: string;

}