import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SessionModule } from './session/session.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, SessionModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
