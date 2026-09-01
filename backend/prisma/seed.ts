import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'mirzatestebesov51@gmail.com';
  const rawPassword = 'mirzat140510999';

  // Паролду коопсуз хешке айландыруу (Коддо ачык сырсөз сакталбайт)
  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword,
      role: Role.ADMIN,
    },
    create: {
      email: adminEmail,
      name: 'Super Admin',
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });

  console.log('Администратор базага коопсуз сакталды:', admin.email);
}

main()
  .catch((e) => {
    console.error('Seed катасы:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
