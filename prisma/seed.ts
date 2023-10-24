import { PrismaClient } from '@prisma/client';

import { genSaltSync, hashSync } from 'bcrypt';

const prisma = new PrismaClient();
async function main() {
  const salt: string = genSaltSync();

  await prisma.profiles.upsert({
    where: { id: 1 },
    update: {},
    create: { name: 'Administrador', active: true },
  });

  await prisma.profiles.upsert({
    where: { id: 2 },
    update: {},
    create: { name: 'Operador', active: true },
  });

  await prisma.users.upsert({
    where: {
      email: 'admin@teste.com',
    },
    update: {},
    create: {
      email: 'admin@teste.com',
      name: 'Admin',
      username: 'admin',
      password: hashSync('admin', salt),
      document: '00162009003',
      Profiles: { connect: { id: 1 } },
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
