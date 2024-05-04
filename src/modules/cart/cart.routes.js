import Router from "express";

import {
  addProductToCartSchema,
  //getLoggedUserCartSchema,
} from "./cart.validation.js";
import { allowedTo } from "../../middleware/authorization.js";
import { validation } from "../../middleware/validation.js";
import { protectRoutes } from "../../middleware/authentication.js";
import { addProductToCart, clearCart, getLoggedUserCart, removeSpecificCartItem, } from "./cart.controller.js";

const cartRouter = Router();

cartRouter.post(
  "/addProductToCart",
  protectRoutes,
  allowedTo("User", "Admin"),
  validation(addProductToCartSchema),
  addProductToCart
);
cartRouter.get(
  "/getLoggedUserCart",
  protectRoutes,
  allowedTo("User", "Admin"),
  getLoggedUserCart
);

cartRouter.put(
  "/removeSpecificCartItem/:productId",
  protectRoutes,
  allowedTo("User", "Admin"),
  removeSpecificCartItem
);

cartRouter.delete(
  "/clearCart",
  protectRoutes,
  allowedTo("User", "Admin"),
  clearCart
);

export default cartRouter
