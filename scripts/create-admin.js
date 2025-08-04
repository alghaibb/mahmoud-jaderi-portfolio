const { PrismaClient } = require('@/generated/prisma');

const prisma = new PrismaClient();

async function createAdminUser() {
  try {
    // Create admin user
    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@mahmoudjaderi.com',
        emailVerified: true,
        name: 'Admin User',
      },
    });

    // Create email and password credentials
    const credentials = await prisma.emailAndPassword.create({
      data: {
        userId: adminUser.id,
        email: 'admin@mahmoudjaderi.com',
        password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/HS.iK8i', // "admin123"
      },
    });

    console.log('Admin user created successfully:', adminUser.email);
    console.log('Credentials created:', credentials.email);
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser(); 