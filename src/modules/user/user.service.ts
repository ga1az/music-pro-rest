import { ConflictException, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { USER_REPOSITORY, UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
    findAll(inStock: boolean) {
        throw new Error('Method not implemented.');
    }
    constructor(
        @Inject(USER_REPOSITORY)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) { }

    async exists(username: string): Promise<boolean> {
        return await this.userRepository.exists(username);
    }
    async createUser(user: CreateUserDto): Promise<any> {
        const exists = await this.userRepository.exists(user.username);
        if (exists) {
            throw new ConflictException(
                `Product with "${user.username}" already exists`,
            );
        }
        const { password } = user;
        const hashPass = await hash(password, 10);
        user = { ...user, password: hashPass };
        const newUser = await this.userRepository.create(user);
        return this.userRepository.save(newUser);
    }

    getUsers() {
        return this.userRepository.find();
    }



    getUserById(id: number) {
        const userFound = this.userRepository.getUserById(id);
        if (!userFound) {
            return new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        return userFound;
    }

    async delete(username: string): Promise<void> {
        const exists = await this.userRepository.findOne({
            where: {
                username: username,
            },
        });

    }

    async update(id: number, user: User): Promise<User> {
        const exists = await this.userRepository.exists(user.username);
        if (!exists) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return await this.userRepository.update(user);
    }

    async login(username: string, password: string) {
        const user: any = await this.userRepository.getUserByUsername(username);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
        }

        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
