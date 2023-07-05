import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

export const USER_REPOSITORY = 'UserRepository';

export interface UserRepository {
    delete(arg0: { id: number; }): unknown;
    find(): unknown;
    save(newUser: User): unknown;
    exists(username: string): Promise<boolean>;
    findOne(arg0: { where: { username: string; }; }): unknown;
    getUserById(id: number): unknown;
    getUserByUsername(username: string): unknown;
    findAll(): Promise<User[]>;
    create(user: CreateUserDto): Promise<User>;
    update(user: CreateUserDto): Promise<User>;
}
