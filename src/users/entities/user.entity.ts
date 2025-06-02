import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { Role } from "../../common/enums/rol.enum";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    username: string;

    @Column({select: false})
    password: string;

    @Column({type:'enum',  default: Role.USER, enum: Role })
    role: string;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}
