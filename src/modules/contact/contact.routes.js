import express from "express" 
import { validation } from "../../middleware/validation.js"
import { protectRoutes } from "../../middleware/authentication.js"
import { allowedTo } from "../../middleware/authorization.js"
import { addcontactval } from "./contact.validation.js"
import { addcontact } from "./contact.controller.js"






const contactRouter = express.Router()

contactRouter
.route('/')
.post(protectRoutes,allowedTo('User','Admin'),validation(addcontactval),addcontact)




export default contactRouter