import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllProducts = () => {
  return prisma.product.findMany({
    include: { category: true },
  });
};

export const createProduct = (data: { name: string; price: number; categoryId: number }) => {
  return prisma.product.create({ data });
};
