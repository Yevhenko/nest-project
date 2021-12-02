import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "@components/user/models/User";
import { AuthService } from "@components/auth/auth.service";
import { UserService } from "@components/user/user.service";
import { AuthController } from "@components/auth/auth.controller";
import { AuthMiddleware } from "@components/auth/auth.middleware";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthService, UserService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}