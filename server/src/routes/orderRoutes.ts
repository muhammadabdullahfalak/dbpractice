import { Router } from "express";
import * as orderController from "../controllers/orderController";

const router = Router();

router.get("/", orderController.getOrders);
router.post("/", orderController.addOrder);

export default router;
