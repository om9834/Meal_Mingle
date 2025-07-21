import mongoose from "mongoose";


export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://sahilamrutkar1808:8956236362@cluster0.bveijsv.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}