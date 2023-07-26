import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../../auth/auth.service';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  username: string;

  @Column()
  phoneNumber: string;

  @Column({ unique: true })
  email: string;
  @Column()
  name: string;
  @Column()
  password: string;
  orders: any;
  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }

  @Column()
  address: string;
}
