// src/controllers/orderController.ts
import { Request, Response } from "express";
import * as orderService from "../services/orderService";



export const getOrders = async (_req: Request, res: Response) => {
  const orders = await orderService.getAllOrders();
  res.json(orders);
};

export const addOrder = async (req: Request, res: Response) => {
  const { quantity, productId, userId } = req.body;

  if (quantity === undefined || productId === undefined) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    const order = await orderService.createOrder({ quantity, productId, userId });
    res.status(201).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
