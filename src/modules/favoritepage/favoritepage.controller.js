import { UserModel } from "../../../databases/models/user.model.js"
import { catchError } from "../../middleware/catchError.js"


const addfavoritepage = catchError(async(req,res,next)=>{
    let favoritepage = await UserModel.findByIdAndUpdate(req.user._id, {$addToSet:{favoritepage:req.body.product}},{new:true}).populate('favoritepage')
    !favoritepage && res.status(403).json({message:"No favoritepage found"})
    favoritepage && res.json({message:"success",favoritepage: favoritepage.favoritepage})
})

const removefavoritepage = catchError(async(req,res,next)=>{
    let favoritepage = await UserModel.findByIdAndUpdate(req.user._id, {$pull:{favoritepage:req.params.id}},{new:true})
    !favoritepage && res.status(403).json({message:"No favoritepage found"})
    favoritepage && res.json({message:"success",favoritepage:favoritepage.favoritepage})
})



// const getuserfavoritepage = catchError(async(req,res,next)=>{
//     let favoritepage= await UserModel.findById(req.user._id)
//     !favoritepage && res.status(403).json({message:"No favoritepage found"})
    
//     favoritepage && res.json({message:"success",favoritepage:favoritepage.product})
// })
const getuserfavoritepage = catchError(async (req, res, next) => {
    try {
        let user = await UserModel.findById(req.user._id).populate('product');
        
        if (!user) {
            return res.status(403).json({ message: "No user found" });
        }
        
        res.json({ message: "Success", favoriteProducts: user.product });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred" });
    }
});







export{
    addfavoritepage,
    removefavoritepage,
    getuserfavoritepage 
    
}