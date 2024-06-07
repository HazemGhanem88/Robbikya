import { contactModel } from "../../../databases/models/contact.model.js"
import { catchError } from "../../middleware/catchError.js"




const addcontact = catchError(async(req,res,next)=>{   
    let contact = new contactModel(req.body)
     await contact.save()
     res.json({message:"suceess"})

})


export{
    addcontact
}