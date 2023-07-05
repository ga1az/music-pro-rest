import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../entities/user.entity';
import { UserDocument, UserModel } from '../schemas/user.schema';

@Injectable()
export class UserMongoRepository {
    constructor(@InjectModel(User.name) private userModel: UserModel) { }

    async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async exists(username: string): Promise<boolean> {
        const user = await this.userModel.findOne({ username: username }).exec();
        return !!user
    }
    async getUserById(id: number): Promise<User> {
        return await this.userModel.findOne({ id: id }).exec();
    }

    async getUserByUsername(username: string): Promise<User> {
        return await this.userModel.where({
            username: username
        }).findOne().exec();
    }

    async create(user: User): Promise<User> {
        return await new this.userModel(user).save();
    }

    async update(user: User): Promise<User> {
        return await this.userModel
            .findOneAndUpdate({ username: user.username }, user, { new: true })
            .exec();
    }

    //save
    async save(user: User): Promise<User> {
        const userDocument = await this.userModel.findOne({ id: user.id }).exec();
        if (userDocument) {
            return await this.update(user);
        }
        return await this.create(user);
    }

    private mapToUser(userDocument: UserDocument): User {
        const user = new User();
        user.created_at = userDocument.created_at;
        user.username = userDocument.username;
        user.password = userDocument.password;
        user.authStrategy = userDocument.authStrategy;
        return user;
    }
}
