// src/config/db.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('🟢 Database connected');
  } catch (error) {
    console.error('🔴 Database connection error:', error);
    process.exit(1);
  }
};

export default prisma;
