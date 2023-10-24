import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { PrismaService } from '../prisma/prisma.service';
import { SessionRepository } from './repository/session.repository';

@Module({
  providers: [PrismaService, SessionService, SessionRepository],
  exports: [SessionService, SessionRepository],
})
export class SessionModule {}
