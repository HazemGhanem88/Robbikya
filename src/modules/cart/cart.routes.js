import Router from "express";
import {
  addProductToCartSchema,
  updateProductQuantitySchema
  //getLoggedUserCartSchema,
} from "./cart.validation.js";
import { allowedTo } from "../../middleware/authorization.js";
import { validation } from "../../middleware/validation.js";
import { protectRoutes } from "../../middleware/authentication.js";
import {
  addProductToCart,
  clearCart,
  clearcart,
  getLoggedUserCart,
  removeProductFromCart,
  // removeSpecificCartItem,
  updateProductQuantity
} from "./cart.controller.js";

const cartRouter = Router();

cartRouter.post(
  "/addProductToCart",
  protectRoutes,
  allowedTo("User", "Admin"),
  validation(addProductToCartSchema),
  addProductToCart
);
cartRouter.post(
  "/updateProductQuantity",
  protectRoutes,
  allowedTo("User", "Admin"),
  validation(updateProductQuantitySchema),
  updateProductQuantity
);
cartRouter.get(
  "/getLoggedUserCart",
  protectRoutes,
  allowedTo("User", "Admin"),
  getLoggedUserCart
);

cartRouter.delete(
  "/removeSpecificCartItem/:productId",
  protectRoutes,  
  allowedTo("User", "Admin"),
  // removeSpecificCartItem
  removeProductFromCart
);

cartRouter.delete(
  "/clearCart",
  protectRoutes,
  allowedTo("User", "Admin"),
  clearcart
);

export default cartRouter;