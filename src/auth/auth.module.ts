import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import getPrivateKey from 'src/utils/getPrivateKeyFromFile';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: getPrivateKey(),
      signOptions: { expiresIn: '30m' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
