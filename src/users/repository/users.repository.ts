import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Users } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UsersWhereUniqueInput,
  ): Promise<Users | null> {
    const user = await this.prisma.users.findUnique({
      where: userWhereUniqueInput,
    });
    if (!user) {
      throw new NotFoundException(
        `Id ${userWhereUniqueInput.id} de usuário não encontrado.`,
      );
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
}
