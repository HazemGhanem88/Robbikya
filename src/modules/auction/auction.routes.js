import { protectRoutes } from "../../middleware/authentication.js"
import express from "express"
import { allowedTo } from "../../middleware/authorization.js"
import { validation } from "../../middleware/validation.js"
import { addauctionval, updateauctionval } from "./auction.validation.js"
import { addacuction, getauction, updateauction } from "./auction.controller.js"


const auctionRouter = express.Router()





auctionRouter
.route('/')
.post(protectRoutes,allowedTo('Admin','User'),validation(addauctionval),addacuction)



auctionRouter
.route('/:id')
.put(protectRoutes,allowedTo('Admin','User'),validation(updateauctionval),updateauction)
.get(protectRoutes,allowedTo('Admin','User'),getauction)





export default auctionRouter