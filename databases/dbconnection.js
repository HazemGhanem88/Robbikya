import mongoose from "mongoose"

export const dbConnection = () => {
    mongoose.connect("mongodb+srv://ADMIN:u5HBzihe4XgItPI0@cluster0.5mhmytf.mongodb.net/robbikya").then(() => {
        console.log('database connected');
    }).catch((err) => {
        console.log('databases error', err);
    })
}



//u5HBzihe4XgItPI0