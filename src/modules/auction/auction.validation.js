import Joi from "joi";

const addauctionval = Joi.object({

    ProductId :Joi.string().hex().length(24).required(),
    UserId:Joi.string().hex().length(24).required(),
    offerPrice:Joi.number().required(),
    fristPrice:Joi.number().required(),
    highestPrice:Joi.number().required(),
        

})




const updateauctionval = Joi.object({
    id: Joi.string().hex().length(24).required(),
    ProductId :Joi.string().hex().length(24),
    UserId:Joi.string().hex().length(24),
    offerPrice:Joi.number(),
    fristPrice:Joi.number(),
    highestPrice:Joi.number()
        

})



const paramval =Joi.object({
    id: Joi.string().hex().length(24).required(),
})









export {
    addauctionval,
    updateauctionval,
    paramval
}



