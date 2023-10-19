import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SessionModule } from './session/session.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, SessionModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
