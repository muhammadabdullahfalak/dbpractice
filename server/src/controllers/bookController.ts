import { Request, Response } from "express";
import * as bookService from "../services/bookService";

export const getBooks = async (_req: Request, res: Response) => {
  const books = await bookService.getAllBooks();
  res.json(books);
};

export const addBook = async (req: Request, res: Response) => {
  const book = await bookService.createBook(req.body);
  res.status(201).json(book);
};


export const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedBook = await bookService.updateBook(Number(id), req.body);
  res.json(updatedBook);
}

export const deleteBook = async (req: Request, res: Response) => {  
  const { id } = req.params;
  await bookService.deleteBook(Number(id));
  res.status(204).send();
}