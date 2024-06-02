import ImageClassifier from "../../utils/Image_Classifier.js";
// Usage example:
const classifier = new ImageClassifier();

const addPhoto =  catchError(async(req,res,next)=>{

    const {image} = req.body;
    classifier.classifyImage(image).then((result) => {
        let photo = result.className
        console.log(
          `The highest probability prediction is ${
            result.className
          } with a probability of ${(result.probability * 100).toFixed(2)}%`
        );
        res.json({message:"suceess",photo})
      });
     
   })


   export {
    addPhoto
   }
         
  