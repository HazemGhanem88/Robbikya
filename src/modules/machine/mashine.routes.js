import { protectRoutes } from "../../middleware/authentication.js";
import { allowedTo } from "../../middleware/authorization.js";

const { addPhoto } = require("./mashine.controller.js");



const photoRouter = express.Router()

.route('/')
.post(protectRoutes,allowedTo('User','Admin'),uploadsinglefile('image'),addPhoto)

export default photoRouter;
