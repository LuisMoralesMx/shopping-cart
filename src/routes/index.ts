import express from "express";
import ProfileController from "../controllers/profile";
import ProductsController from "../controllers/products";

const router = express.Router();

router.get("/api/profile/cart", async (_req, res) => {
  const controller = new ProfileController();
  const response = await controller.getCart();
  return res.send(response);
});

router.get("/api/products", async (_req, res) => {
    const controller = new ProductsController();
    const response = await controller.getProducts();
    return res.send(response);
  });

export default router;