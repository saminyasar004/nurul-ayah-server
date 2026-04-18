import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

async function test() {
  try {
    const prisma = new PrismaClient();
    console.log('Successfully instantiated PrismaClient');
    await prisma.$connect();
    console.log('Successfully connected');
    await prisma.$disconnect();
  } catch (err) {
    console.error('Failed to instantiate or connect:', err);
  }
}

test();
