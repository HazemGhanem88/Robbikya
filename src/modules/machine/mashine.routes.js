import { protectRoutes } from "../../middleware/authentication.js";
import { allowedTo } from "../../middleware/authorization.js";
import { addPhoto } from "./mashine.controller.js";
import express from "express"




const photoRouter = express.Router()

.route('/')
.post(protectRoutes,allowedTo('User','Admin'),uploadsinglefile('image'),addPhoto)

export default photoRouter;
