import { Injectable } from '@nestjs/common';
import { SessionRepository } from './repository/session.repository';
import { CreateSessionDTO } from './dto/CreateSession.dto';

@Injectable()
export class SessionService {
  constructor(private readonly repository: SessionRepository) {}

  async createSession(data: CreateSessionDTO) {
    return await this.repository.createSession(data);
  }

  async unactiveSessionsUserId(user_id: string) {
    await this.repository.unactiveSessionsUserId(user_id);
  }

  async unactiveSession(token: string) {
    await this.repository.unactiveSession(token);
  }
}
