import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSessionDTO } from '../dto/CreateSession.dto';

@Injectable()
export class SessionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createSession(data: CreateSessionDTO) {
    return await this.prisma.sessions.create({
      data,
    });
  }

  async unactiveSession(token: string) {
    await this.prisma.sessions.update({
      where: { token },
      data: { active: false },
    });
  }

  async unactiveSessionsUserId(user_id: number) {
    await this.prisma.sessions.updateMany({
      where: { user_id },
      data: { active: false },
    });
  }
}
