// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import { getAllUsers, createUser } from '../services/user.service';

export const getUsers = async (req: Request, res: Response) => {
  const users = await getAllUsers();
  res.json(users);
};

export const postUser = async (req: Request, res: Response) => {
  const newUser = await createUser(req.body);
  res.status(201).json(newUser);
};
