import 'reflect-metadata';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './components/user/user.controller';
import { UserModule } from './components/user/user.module';
import { UserService } from './components/user/user.service';
import { ProductsModule } from './components/product/products.module';
import { ProductsController } from './components/product/products.controller';
import { ProductsService } from './components/product/products.service';
import { AuthMiddleware } from './components/auth/auth.middleware';
import { AuthController } from './components/auth/auth.controller';
import { AuthService } from './components/auth/auth.service';
import { Connection } from 'typeorm';
import { AuthModule } from './components/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule, UserModule, ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  constructor(private readonly connection: Connection) {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('users', 'products');
  }
}
