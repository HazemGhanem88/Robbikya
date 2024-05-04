import { productmodel } from "../../../databases/models/product.model.js"
import { catchError } from "../../middleware/catchError.js"
import { ApiFeatures } from "../../utils/ApiFeatures.js"
import slugify from "slugify"


const addproduct =  catchError(async(req,res,next)=>{
    req.body.slug = slugify(req.body.name) 
    req.body.imgCover= req.files.imgCover[0].filename 
    req.body.images = req.files.images.map((img)=> img.filename)   
    let product = new productmodel(req.body)
     await product.save()
     res.json({message:"suceess",product})

})


const getallproducts =  catchError(async(req,res,next)=>{   
       
  let apiFeatures = new ApiFeatures(productmodel.find(),req.query).pagination().filter().sort().fields().search()
  let products= await apiFeatures.mongooseQuery
    
    res.json({message:"suceess",products})

})

const getsingleproduct =  catchError(async(req,res,next)=>{   
    let product= await productmodel.findById(req.params.id)
    !product && res.status(404).json({message:"product is not found"})
    product&&res.json({message:"suceess",product})
})

const updateproduct =  catchError(async(req,res,next)=>{
  if(req.body.name)req.body.slug=slugify(req.body.title)
  if(req.body.imgCover)req.body.imgCover= req.files.imgCover[0].filename 
  if( req.body.images) req.body.images = req.files.images.map((img)=> img.filename)   
   let product = await productmodel.findByIdAndUpdate(req.params.id , req.body , {new:true})
   !product && res.status(404).json({message:"product is not found"})
   product&&res.json({message:"suceess",product})
   })


const deleteproduct =  catchError(async(req,res,next)=>{
   let product = await productmodel.findByIdAndDelete(req.params.id)
   !product && res.status(404).json({message:"product is not found"})
   product&&res.json({message:"suceess",product})
   })


    




export{
    addproduct,
    getallproducts,
    getsingleproduct,
    updateproduct,
    deleteproduct
}