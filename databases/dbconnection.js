import mongoose from "mongoose"

export const dbConnection = () => {
    mongoose.connect("mongodb+srv://adminnnnn:NSjyNJNde72oisJK@cluster0.5mhmytf.mongodb.net/robbikya").then(() => {
        console.log('database connected');
    }).catch((err) => {
        console.log('databases error', err);
    })
}



//NSjyNJNde72oisJK