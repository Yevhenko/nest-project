import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@components/user/user.module';
import { PostModule } from '@components/post/post.module';
import { AuthModule } from '@components/auth/auth.module';
import { AuthMiddleware } from '@components/auth/auth.middleware';
import { AuthService } from "@components/auth/auth.service";
import { UserService } from "@components/user/user.service";
import { UserController } from "@components/user/user.controller";
import { PostController } from "@components/post/post.controller";

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, PostModule, AuthModule],
  providers: [AuthMiddleware]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(UserController, PostController);
  }
}
