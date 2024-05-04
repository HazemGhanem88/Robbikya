import asyncHandler from "express-async-handler";
import { productmodel } from "../../../databases/models/product.model.js";
import { cartModel } from "../../../databases/models/cart.model.js";


const calculateTotalCartPrice = (cart) => {
  let totalPrice = 0;
  console.log("cart: ", cart);
  cart.cartItems.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });
  cart.totalCartprice = totalPrice;
  cart.totalCartpriceAfterDiscount = undefined;
  return totalPrice;
};

//@desc add product to cart
//@route POST
//@access private/User
export const addProductToCart = asyncHandler(async (req, res, next) => {
  const { productId } = req.body;

  const product = await productmodel.findById(productId);
  if (!product) {
    res.status(404).json({ message: "Product Not Found" });
  }

  const productPrice = product.price;
  //get cart for logged in user
  let cart = await cartModel.findOne({ user: req.user._id });
  //if no cart
  if (!cart) {
    //create a new cart for this user with the product
    cart = await cartModel.create({
      user: req.user._id,
      //we can use $addtoSet

      cartItems: [{ product: productId, price: productPrice }],
    });
  } else {
    // is this product exists in the cart,update product quantity
    const productIndex = cart.cartItems.findIndex(
      (item) => item.product.toString() === productId
    );
    //find index if there is no item with this productid and color it will return -1
    //if productIndex > -1 then he found a product with  this productid and color  then i will update the quantity
    if (productIndex > -1) {
      const cartItem = cart.cartItems[productIndex];
      cartItem.quantity += 1;
      // add this item to cart in his index
      cart.cartItems[productIndex] = cartItem;
    } else {
      //if the product is not exist in the cart ,push product to cartItem array
      cart.cartItems.push({ product: productId, price: productPrice });
    }
  }

  //calculate total cart price
  calculateTotalCartPrice(cart);

  await cart.save();

  res.status(200).json({
    status: "success",
    numberOfCartItems: cart.cartItems.length,
    message: "product added to cart successfully",
    data: cart,
  });
});

//@desc get logged user cart
//@route GET
//@access private/User
export const getLoggedUserCart = asyncHandler(async (req, res, next) => {
  const cart = await  cartModel.findOne({ user: req.user._id });
  if (!cart) {
    res.status(404).json({ message: "cart Not Found" });
  }
  res.status(200).json({
    status: "success",
    numberOfCartItems: cart.cartItems.length,
    data: cart,
  });
});

//@desc remove item from cart
//@route DELETE
//@access private/User
export const removeSpecificCartItem = asyncHandler(async (req, res, next) => {
  const cart = await  cartModel.findOneAndUpdate(
    { user: req.user._id },
    {
      //remove an item from cart if exists
      $pull: { cartItems: { _id: req.params.itemId } },
    },
    { new: true }
  );

  //calculate total cart price
  calculateTotalCartPrice(cart);

  await cart.save();

  res.status(200).json({
    status: "success",
    numberOfCartItems: cart.cartItems.length,
    data: cart,
  });
});

//@desc clear all items from cart
//@route DELETE
//@access private/User
export const clearCart = asyncHandler(async (req, res, next) => {
  const cart = await cartModel.findOneAndDelete({ user: req.user._id });

  res.status(200).json({ success: true, message: "delete successfully", cart });
});
