
import slugify from "slugify"
import { categorymodel } from "../../../databases/models/category.model.js"
import { catchError } from "../../middleware/catchError.js"
import { ApiFeatures } from "../../utils/ApiFeatures.js"



const addcategory =  catchError(async(req,res,next)=>{
  
    req.body.slug = slugify(req.body.name) 
    req.body.image = req.file.filename   
    let category = new categorymodel(req.body)
     await category.save()
     res.json({message:"suceess",category})

})


const getallcategories =  catchError(async(req,res,next)=>{   
       
  let apiFeatures = new ApiFeatures(categorymodel.find(),req.query).pagination().filter().sort().fields().search()
  let categories= await apiFeatures.mongooseQuery
    
    res.json({message:"suceess",categories})

})

const getsinglecategory =  catchError(async(req,res,next)=>{   
    let category= await categorymodel.findById(req.params.id)
    !category && res.status(404).json({message:"category is not found"})
    category&&res.json({message:"suceess",category})
})

const updatecategory =  catchError(async(req,res,next)=>{
  if(req.body.name)  req.body.slug = slugify(req.body.name)
  if(req.file)  req.body.image = req.file.filename  
   let category = await categorymodel.findByIdAndUpdate(req.params.id , req.body , {new:true})
   !category && res.status(404).json({message:"category is not found"})
   category&&res.json({message:"suceess",category})
   })


const deletecategory =  catchError(async(req,res,next)=>{
   let category = await categorymodel.findByIdAndDelete(req.params.id)
   !category && res.status(404).json({message:"category is not found"})
   category&&res.json({message:"suceess",category})
   })


    




export{
    addcategory,
    getallcategories,
    getsinglecategory,
    updatecategory,
    deletecategory
}