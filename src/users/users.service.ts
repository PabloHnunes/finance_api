import { Injectable } from '@nestjs/common';
import { UsersRepository } from './repository/users.repository';
import * as DTO from './dto';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) {}

  async createUser(data: DTO.CreateUserBodyDTO) {
    const user = await this.repository.createUser(data);

    return new DTO.ResponseUserDTO('Usuário cadastrado com sucesso!', user, []);
  }

  async updateUser(data: DTO.UpdateUserBodyDTO) {
    const user = await this.repository.updateUser({
      where: { id: data.id },
      data,
    });

    return new DTO.ResponseUserDTO('Usuário atualizado com sucesso!', user, []);
  }

  async deleteUsers({ list }: DTO.DeleteUserBodyDTO) {
    await Promise.all(
      list.map(async (item) => {
        await this.repository.user({ id: item.id });
      }),
    );

    const deletedUsers = await Promise.all(
      list.map(async (item) => {
        const deletedUser = await this.repository.deleteUser({ id: item.id });

        return new DTO.UserDTO(
          deletedUser.id,
          deletedUser.name,
          deletedUser.username,
          deletedUser.email,
          deletedUser.document,
          deletedUser.profile_id,
        );
      }),
    );

    return new DTO.ResponseListUserDTO(
      'Usuário(s) removido(s) com sucesso!',
      deletedUsers,
      [],
    );
  }

  async validateUser(username: string, password?: string) {
    return await this.repository.validateUser(username, password);
  }

  async getUsers(offSet?: number, limit?: number) {
    return await this.repository.users({
      skip: offSet ? offSet : undefined,
      take: limit ? limit : undefined,
    });
  }
}
