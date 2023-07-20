import { Entity,PrimaryGeneratedColumn, Column  } from "typeorm";

@Entity()
export class ProductLine {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'id'
    })
    id: number;
    
    
    @Column({
        nullable:false
    })
    name: string;

    @Column({
        nullable:true
    })
    description: string;
}