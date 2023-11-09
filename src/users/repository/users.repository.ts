import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Users } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthUserDTO } from '../dto/AuthUser.dto';
import { compareSync } from 'bcrypt';
import { CreateUserBodyDTO, UserDTO } from '../dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async user(where: Prisma.UsersWhereInput): Promise<Users | null> {
    const user = await this.prisma.users.findFirst({
      where,
    });
    if (!user) {
      throw new NotFoundException(`Usuário não encontrado.`);
    }
    return user;
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UsersWhereUniqueInput;
    where?: Prisma.UsersWhereInput;
    orderBy?: Prisma.UsersOrderByWithRelationInput;
  }): Promise<UserDTO[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return await this.prisma.users.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      select: {
        id: true,
        document: true,
        email: true,
        name: true,
        profile_id: true,
        username: true,
        password: false,
      },
    });
  }

  async createUser(data: CreateUserBodyDTO) {
    await this.validadeDataUser(data.username, data.email);

    const userCreated = await this.prisma.users.create({
      data,
    });

    return new UserDTO(
      userCreated.id,
      userCreated.name,
      userCreated.username,
      userCreated.email,
      userCreated.document,
      userCreated.profile_id,
    );
  }

  async updateUser(params: {
    where: Prisma.UsersWhereUniqueInput;
    data: Prisma.UsersUpdateInput;
  }) {
    const { where, data } = params;

    await this.validadeDataUser(data.username as string, data.email as string);

    return await this.prisma.users.update({
      data: { ...data, password: data.password ? data.password : undefined },
      where,
    });
  }

  async deleteUser(where: Prisma.UsersWhereUniqueInput): Promise<Users> {
    return await this.prisma.users.delete({
      where,
    });
  }

  async validateUser(username: string, password?: string) {
    const user = await this.prisma.users.findFirst({
      where: {
        OR: [{ username: { contains: username } }, { email: username }],
      },
    });
    if (!user) {
      throw new BadRequestException('Usuário ou Senha Inválidos');
    }

    if (password && !compareSync(password, user?.password)) {
      throw new BadRequestException('Usuário ou Senha Inválidos');
    }

    return new AuthUserDTO(
      user.id,
      user.name,
      user.email,
      user.document,
      user.profile_id,
      user.username,
    );
  }

  private async validadeDataUser(username: string, email: string) {
    const user = await this.prisma.users.findFirst({
      where: { OR: [{ email: email }, { username: username }] },
    });

    if (user) {
      throw new BadRequestException(
        (user.email = email
          ? 'Email já cadastrado.'
          : 'Username já está em uso.'),
      );
    }
  }
}
