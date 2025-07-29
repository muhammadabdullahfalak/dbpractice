// src/services/user.service.ts
import prisma from '../config/db';

export const getAllUsers = () => prisma.user.findMany({
  include: {
    orders: {
      include: {
        product: true
      }
    }
  }
});

export const createUser = (data: { name: string; email: string }) =>
  prisma.user.create({ data });
