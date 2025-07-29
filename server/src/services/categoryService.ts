import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllCategories = () => prisma.category.findMany();

export const createCategory = (data: { name: string }) => prisma.category.create({ data });
