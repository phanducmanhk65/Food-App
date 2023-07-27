import { Entity,PrimaryGeneratedColumn, Column  } from "typeorm";

@Entity()
export class Dish {
    @PrimaryGeneratedColumn(
        'increment'
    )
    id: number;

    @Column({
        name: "productLine"
        })
    productLine: string;

    @Column()
    name: string;

    @Column({
        name: "price",
        nullable: false, 
        type: 'double'
      })
    price: number;

      @Column({
        name: "idRestaurant",
        nullable: false  })
    idRestaurant: number;


}
