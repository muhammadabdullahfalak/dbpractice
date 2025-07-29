// src/services/orderService.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface OrderData {
  quantity: number;
  productId: number;
  userId: number;
}

export const getAllOrders = async () => {
  return await prisma.order.findMany();
};



export const createOrder = async ({ quantity, productId, userId }: OrderData) => {
  return await prisma.order.create({
    data: {
      quantity,
      product: {
        connect: { id: productId },
      },
      user: {
        connect: { id: userId }, 
      },
    },
    include: {
      product: true,
      user: true,
    },
  });
};
