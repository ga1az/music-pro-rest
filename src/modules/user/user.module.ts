import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersController } from './user.controller';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt.constants';
import { JwtStrategy } from './jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { USER_REPOSITORY } from './repositories/user.repository';
import { UserMongoRepository } from './repositories/user-mongo.repository';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        UserModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '20h' },
        }),
    ],
    controllers: [UsersController],
    providers: [
        UserService,
        JwtStrategy,
        {
            provide: USER_REPOSITORY,
            useClass: UserMongoRepository,
        },
    ],
})
export class UserModule { }
