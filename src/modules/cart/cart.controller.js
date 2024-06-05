// import asyncHandler from "express-async-handler";
// import { productmodel } from "../../../databases/models/product.model.js";
// import { cartModel } from "../../../databases/models/cart.model.js";
// import  {isValidObjectId}  from "mongoose";
// import { AppError } from "../../utils/AppError.js";
// //const calculateTotalCartPrice = (cart) => {
// //   let totalPrice = 0;

// //   cart.cartItems.forEach((item) => {
// //     totalPrice += item.price * item.quantity;
// //   });
// //   cart.totalCartprice = totalPrice;
// //   cart.totalCartpriceAfterDiscount = undefined;
// //   return totalPrice;
// // };


// const calculateTotalCartPrice = (cart) =>{
//   let totalPrice = 0
//       cart.cartItems.forEach((item)=>{
//         totalPrice+= item.quantity * item.price} )
//         cart.totalPrice=totalPrice
// }


// export const addProductToCart= (async(req,res,next)=>{

//   let product = await productmodel.findById(req.body.product)
//   if(!product) return next(new AppError('product not found ',404))
  
  
//   if(req.body.quantity>product.quantity) return next(new AppError('sold out'))
  
//     req.body.price = product.price
  
  
//       let cartisExist = await cartModel.findOne({user:req.user._id})
//        if(!cartisExist){
//         let cart = new cartModel({
//           user : req.user._id,
//           cartItems:[req.body]
//         })
//         calculateTotalCartPrice(cart);
//         await cart.save()
//         !cart&&res.status(401).json({error:"cart not found"});
//         cart && res.json({message:"founded cart",cart})
  
//        }
//        else{
  
  
//         let item = cartisExist.cartItems.find((item)=>item.product == req.body.product)
//         if(item){
//           if(item.quantity>=product.quantity) return next(new AppError('sold out'))
//           item.quantity += req.body.quantity || 1
//         }
//         else cartisExist.cartItems.push(req.body)
  
//         calculateTotalCartPrice(cartisExist)
//         await cartisExist.save()
//         res.json({message:'success',cart: cartisExist})
//        }
//   })

















// //@desc add product to cart
// //@route POST
// //@access private/User
// // export const addProductToCart = asyncHandler(async (req, res, next) => {
// //   const { productId, quantity } = req.body;

// //   const product = await productmodel.findById(productId);
// //   if (!product) {
// //     res.status(404).json({ message: "Product Not Found" });
// //   }

// //   const productPrice = product.price;
// //   //get cart for logged in user
// //   let cart = await cartModel.findOne({ user: req.user._id,_id: req.user.cart });
// //   //if no cart
// //   // if (!cart) {
// //   //   //create a new cart for this user with the product
// //   //   cart = await cartModel.create({
// //   //     user: req.user._id,
// //   //     //we can use $addtoSet

// //   //     cartItems: [{ product: productId, price: productPrice }],
// //   //   });
// //   // } else {
// //     // is this product exists in the cart,update product quantity
// //     const productIndex = cart.cartItems.findIndex(
// //       (item) => item.product.toString() === productId
// //     );
// //     //find index if there is no item with this productid and color it will return -1
// //     //if productIndex > -1 then he found a product with  this productid and color  then i will update the quantity
// //     const qty = Number(quantity) || 0;
// //     if(qty>=1&&product.toJSON()?.quantity - qty < 0) throw new Error("max quantity is "+ product.toJSON()?.quantity)

// //     if (productIndex > -1) {
// //       const cartItem = cart.cartItems[productIndex];
      
      
// //       const productQty = qty ? qty || 1 : cart.cartItems[productIndex].quantity + 1
// //       console.log(product.toJSON()?.quantity);  

// //       if(product.toJSON()?.quantity - productQty < 0) throw new Error("max quantity is "+ product.toJSON()?.quantity)
// //             cartItem.quantity = productQty;
// //       // add this item to cart in his index
// //       cart.cartItems[productIndex] = cartItem;
// //     } else {
// //       //if the product is not exist in the cart ,push product to cartItem array
// //       cart.cartItems.push({ product: productId, price: productPrice, quantity: qty?qty:1 });
// //     }
// //   //}

// //   //calculate total cart price
// //   calculateTotalCartPrice(cart);

// //   await cart.save();

// //   res.status(200).json({
// //     status: "success",
// //     numberOfCartItems: cart.cartItems.length,
// //     message: "product added to cart successfully",
// //     data: cart,
// //   });
// // });

// //@desc get logged user cart
// //@route GET
// //@access private/User
// export const getLoggedUserCart = asyncHandler(async (req, res, next) => {
//   const cart = await cartModel.findOne({ user: req.user._id });
//   if (!cart) {
//     res.status(404).json({ message: "cart Not Found" });
//   }
//   res.status(200).json({
//     status: "success",
//     numberOfCartItems: cart.cartItems.length,
//     data: cart,
//   });
// });

// // //@desc remove item from cart
// // //@route DELETE
// // //@access private/User
// // export const removeSpecificCartItem = asyncHandler(async (req, res, next) => {
// //   const cart = await  cartModel.findOneAndUpdate(
// //     { user: req.user._id },
// //     {
// //       //remove an item from cart if exists
// //       $pull: { cartItems: { _id: req.params.itemId } },
// //     },
// //     { new: true }
// //   );

// //   //calculate total cart price
// //   calculateTotalCartPrice(cart);

// //   await cart.save();

// //   res.status(200).json({
// //     status: "success",
// //     numberOfCartItems: cart.cartItems.length,
// //     data: cart,
// //   });
// // });

// // export const removeProductFromCart = async (req, res, next) => {
// //   // * destructure data from authUser
// //   const { productId } = req.params;
// //   // const { _id } = req.authUser;
// //   console.log(req.user._id);
// //   // * check Cart
// //   const userCart = await cartModel.findOne({
// //     user: req.user._id,
// //     "cartItems.product": productId,
// //   });
// //   if (!userCart) {
// //     return next({ message: "Cart not found", cause: 404 });
// //   }

// //   // * remove product from cart
// //   userCart.cartItems = userCart.cartItems.filter(
// //     (product) => product.product.toString() !== productId
// //   );

// //   userCart.subTotal = calculateTotalCartPrice(userCart);

// //   // * save changes
// //   const newCart = await userCart.save();

// //   // * check if cart is empty
// //   if (newCart.cartItems.length === 0) {
// //     await cartModel.findByIdAndDelete(newCart._id);
// //   }

// //   // * response successfully
// //   res.status(200).json({
// //     success: true,
// //     message: "product deleted from cart successfully",
// //     data: newCart,
// //   });
// // };

// export const removeProductFromCart =(async(req,res,next)=>{
//     let cart =await cartModel.findOneAndUpdate({user:req.user._id},{$pull:{cartItems:{_id:req.params.id}}},{new : true})
//     calculateTotalCartPrice (cart)
//      await cart.save()
//     !cart&&res.status(401).json({error:"cart not found"});
//     cart && res.json({message:"founded cart",cart})
//   })
  


// //@desc clear all items from cart
// //@route DELETE
// //@access private/User
// export const clearCart = asyncHandler(async (req, res, next) => {
//   const cart = await cartModel.updateOne({ user: req.user._id.valueOf() },{cartItems:[],totalCartprice: 0,
//     totalCartpriceAfterDiscount: 0});

//   res.status(200).json({ success: true, message: "delete successfully"});
// });

// export const updateProductQuantity = asyncHandler(async (req, res, next) => {
//   const { productId , quantity} = req.body;
//   const product = await productmodel.findById(productId);
//   if (!product) {
//     res.status(404).json({ message: "Product Not Found" });
//   }
  
//   //get cart for logged in user
//   let cart = await cartModel.findOne({ user: req.user._id, _id: req.user.cart });
//   if (!cart) throw new Error("cart not found");

//   //if no cart
//   // if (!cart) {
//   //   //create a new cart for this user with the product
//   //   cart = await cartModel.create({
//   //     user: req.user._id,
//   //     //we can use $addtoSet

//   //     cartItems: [{ product: productId, price: productPrice }],
//   //   });
//   // } else {
//     // is this product exists in the cart,update product quantity
//     const productIndex = cart.cartItems.findIndex(
//       (item) => item.product.toString() === productId
//     );
//     //find index if there is no item with this productid and color it will return -1
//     //if productIndex > -1 then he found a product with  this productid and color  then i will update the quantity
//     const qty = Number(quantity) || 0;
//     if(qty>=1&&product.toJSON()?.quantity - qty < 0) throw new Error("max quantity is "+ product.toJSON()?.quantity)
//     if (productIndex > -1) {
//       const cartItem = cart.cartItems[productIndex];
      
      
      
//       cartItem.quantity = qty;
//       // add this item to cart in his index
//       cart.cartItems[productIndex] = cartItem;
//     } else {
//       //if the product is not exist in the cart ,push product to cartItem array
//       throw new Error("product not found");
//  calculateTotalCartPrice(cart)   }
//   //}

//   //calculate total cart price
//   ;

//   await cart.save();

//   res.status(200).json({
//     status: "success",
//     numberOfCartItems: cart.cartItems.length,
//     message: "product updated successfully",
//     data: cart,
//   });
// });






import { cartModel } from "../../../databases/models/cart.model.js"
import { productmodel } from "../../../databases/models/product.model.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/AppError.js"

const calcTotalprice = (cart) =>{
  let totalPrice = 0
      cart.cartItems.forEach((item)=>{
        totalPrice+= item.quantity * item.price} )
        cart.totalPrice=totalPrice
        if(cart.discount){
          let totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * cart.discount)/100
          cart.totalPriceAfterDiscount = totalPriceAfterDiscount
         
        }
}


const addProductToCart =  catchError(async(req,res,next)=>{

let product = await productmodel.findById(req.body.product)
if(!product) return next(new AppError('product not found ',404))


if(req.body.quantity>product.quantity) return next(new AppError('sold out'))

req.body.price = product.price


    let cartisExist = await cartModel.findOne({user:req.user._id})
     if(!cartisExist){
      let cart = new cartModel({
        user : req.user._id,
        cartItems:[req.body]
      })
      calcTotalprice(cart);
      await cart.save()
      !cart&&res.status(401).json({error:"cart not found"});
      cart && res.json({message:"founded cart",cart})

     }
     else{


      let item = cartisExist.cartItems.find((item)=>item.product == req.body.product)
      if(item){
        if(item.quantity>=product.quantity) return next(new AppError('sold out'))
        item.quantity += req.body.quantity || 1
      }
      else cartisExist.cartItems.push(req.body)

      calcTotalprice(cartisExist)
      await cartisExist.save()
      res.json({message:'success',cart: cartisExist})
     }
})

const removeProductFromCart =catchError(async(req,res,next)=>{
  let cart =await cartModel.findOneAndUpdate({user:req.user._id} , {$pull:{cartItems: {_id:req.params.id}}},{new : true})

  calcTotalprice(cart)
 await cart.save()
  !cart&&res.status(401).json({error:"cart not found"});
  cart && res.json({message:"founded cart",cart})
})


const updateProductQuantity =catchError(async(req,res,next)=>{
  let cart =await cartModel.findOne({user:req.user._id}) 
  !cart&&res.status(401).json({error:"cart not found"});
  let item =  cart.cartItems.find((item)=>item._id == req.params.id)
  if(!item) return next(new AppError("item not found ",404))
  item.quantity = req.body.quantity;

  calcTotalprice(cart)
 await cart.save()
 
  cart && res.json({message:"founded cart",cart})
})

const  getLoggedUserCart = catchError(async(req,res,next)=>{
  let cart = await cartModel.findOne({user:req.user._id}).populate('cartItems.product')
  !cart&&res.status(401).json({error:"cart not found"})
  cart && res.json({message:"founded cart",cart})

})


const clearcart = catchError(async(req,res,next)=>{
  let cart = await cartModel.findOneAndDelete({user:req.user._id})
  !cart&&res.status(401).json({error:"cart not found"})
  cart && res.json({message:"founded cart",cart})

})



export{
  addProductToCart,
  removeProductFromCart,
  updateProductQuantity,
  getLoggedUserCart,
  clearcart, 
}
