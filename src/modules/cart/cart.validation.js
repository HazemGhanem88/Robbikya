import Joi from "joi";
import { Types } from "mongoose";

const objectIdValidation = (value, helper) => {
  const isValid = Types.ObjectId.isValid(value);
  return isValid ? value : helper.message("invalid objectId");
};

export const addProductToCartSchema = Joi.object({
  productId: Joi.string().required().custom(objectIdValidation),
});

export const getLoggedUserCartSchema = Joi.object({
  _id: Joi.string().required().custom(objectIdValidation),
});

