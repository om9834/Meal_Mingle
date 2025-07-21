import foodModel from "../models/foodModel.js";
import fs from 'fs'
// fs means file system


// add food item

const addFood = async (req,res)=>{

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
    try{
        await food.save();//using this method food item gets saved in the database
        res.json({success:true,message:"Food Added"});
    } catch (error)
    {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

// all food list which are available in the dataset
const listFood = async(req,res)=>{
    try{
        const foods = await foodModel.find({});
        //in above foods variable we will get all the dat of food items which is present in the database
        res.json({success:true,data:foods});
    } catch(error){
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

//remove all food items from the database
const removeFood = async (req,res)=>{
    try{
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,() => {});// image deletion from the uploads folder

        await foodModel.findByIdAndDelete(req.body.id);// using this line we delete that id from the database
        res.json({success:true,message:"Food Removed"});
    } catch(error){
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

export {addFood,listFood,removeFood}