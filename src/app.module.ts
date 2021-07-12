import 'reflect-metadata';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './components/user/user.module';
import { ProductsModule } from './components/product/products.module';
import { Connection } from 'typeorm';
import { AuthModule } from './components/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { JwtAuthGuard } from './components/auth/jwt.auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule, UserModule, ProductsModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
