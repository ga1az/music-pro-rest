import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './modules/category/category.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductModule } from './modules/product/product.module';
import { OrderModule } from './modules/order/order.module';
import { WebpayModule } from './modules/webpay/webpay.module';
import { UserModule } from './modules/user/user.module';

@Module({
    imports: [
        CategoryModule,
        ProductModule,
        OrderModule,
        WebpayModule,
        UserModule,
        ConfigModule.forRoot({
            envFilePath:
                process.env.NODE_ENV === 'production'
                    ? '.env.production'
                    : '.env.development',
            isGlobal: true,
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('MONGO_URI'),
                dbName: configService.get<string>('MONGO_DBNAME'),
            }),
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
