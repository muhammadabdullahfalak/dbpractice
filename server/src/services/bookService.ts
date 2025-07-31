import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllBooks = () => prisma.book.findMany();

export const createBook = (data: { title: string, author: string, releaseYear: number }) => prisma.book.create({ data });

export const updateBook = (id: number, data: { title?: string, author?: string, releaseYear?: number }) => 
  prisma.book.update({ where: { id }, data });

export const deleteBook = (id: number) => prisma.book.delete({ where: { id } });