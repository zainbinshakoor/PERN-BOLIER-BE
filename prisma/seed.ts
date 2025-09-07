import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  // Create regular user
  const userPassword = await bcrypt.hash('user123', 12);
  
  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'John Doe',
      password: userPassword,
      role: 'USER',
    },
  });

  // Create sample posts
  await prisma.post.createMany({
    data: [
      {
        title: 'Welcome to the API',
        content: 'This is a sample post created during seeding.',
        published: true,
        authorId: admin.id,
      },
      {
        title: 'Getting Started',
        content: 'Learn how to use this API effectively.',
        published: true,
        authorId: user.id,
      },
      {
        title: 'Draft Post',
        content: 'This is a draft post.',
        published: false,
        authorId: user.id,
      },
    ],
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });