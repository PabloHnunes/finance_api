import { Injectable } from '@nestjs/common';
import { UsersRepository } from './repository/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) {}

  async validateUser(username: string, password?: string) {
    return await this.repository.validateUser(username, password);
  }

  async getUsers(offSet: number, limit: number) {
    return await this.repository.users({
      skip: offSet ? offSet : undefined,
      take: limit ? limit : undefined,
    });
  }
}
