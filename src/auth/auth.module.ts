import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { SessionModule } from 'src/session/session.module';
import { getPrivateKey } from 'src/utils/getPrivateKeyFromFile';
import { JwtStrategy } from './jwt.strategy';

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
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
