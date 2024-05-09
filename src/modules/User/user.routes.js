import express from "express"
import { UpdatePasswordVal,
         forgetPasswordVal,
         paramsValId,
         resetPasswordVal,
         signInVal,
         signUpVal,
         updateUserVal, 
               } from "./user.validation.js";

import { UpdatePassword, 
        deleteUser,
        forgetPassword,
         getAllUserOrders,
         getAllUsers,
         getProfileData,
         logout,
         resetPassword,
         signIn,
         signUp, 
         updateuser} from "./user.controller.js";
import { validation } from "../../middleware/validation.js";
import { protectRoutes } from "../../middleware/authentication.js";
import { allowedTo } from "../../middleware/authorization.js";
import { checkEmail } from "../../middleware/checkEmail.js";
import { uploadsinglefile } from "../../services/uploadfile/uploadfiles.js";





const userRouter=express.Router()
userRouter.route("/signUp").post(uploadsinglefile('image'),validation(signUpVal), checkEmail, signUp);
userRouter.route("/signIn").post(validation(signInVal), signIn);
userRouter.route('/allusers').get(getAllUsers)
userRouter.route("/logOut").patch(protectRoutes, allowedTo("User", "Admin"), logout);
userRouter.route("/forgetPassword").post(validation(forgetPasswordVal), forgetPassword);
userRouter.route("/resetPassword").post(validation(resetPasswordVal), resetPassword);
userRouter.route("/updateUser").put(validation(updateUserVal),updateuser)
userRouter.route("/deleteAccount/:id").delete(protectRoutes, validation(paramsValId),allowedTo("Admin"), deleteUser);
userRouter.route("/getUserAccountData/:id").get(protectRoutes, allowedTo("User","Admin"),validation(paramsValId), getProfileData);
userRouter.route("/UpdatePassword").patch(protectRoutes,allowedTo("User", "Admin"),validation(UpdatePasswordVal),UpdatePassword );
userRouter.route("/userorders/:id").get(validation(paramsValId),getAllUserOrders)


export default userRouter     