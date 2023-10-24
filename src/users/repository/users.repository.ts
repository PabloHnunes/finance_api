import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Users } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthUserDTO } from '../dto/AuthUser.dto';
import { compareSync } from 'bcrypt';

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
  }): Promise<Users[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return await this.prisma.users.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: any) {
    return await this.prisma.users.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.UsersWhereUniqueInput;
    data: Prisma.UsersUpdateInput;
  }) {
    const { where, data } = params;
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
    const user = await this.user({ OR: [{ username }, { email: username }] });
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
}
