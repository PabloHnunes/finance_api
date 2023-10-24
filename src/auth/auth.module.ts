import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { SessionModule } from 'src/session/session.module';
import getPrivateKey from 'src/utils/getPrivateKeyFromFile';

@Module({
  imports: [
    UsersModule,
    SessionModule,
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
