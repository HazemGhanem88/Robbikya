import mongoose from "mongoose"

export const dbConnection = () => {
    mongoose.connect("mongodb+srv://adminn:SvXifpnRSfllnJL8@cluster0.5mhmytf.mongodb.net/robbikya").then(() => {
        console.log('database connected');
    }).catch((err) => {
        console.log('databases error', err);
    })
}



//SvXifpnRSfllnJL8
