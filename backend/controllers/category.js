const { Category } = require("../models/category")

exports.fetchCategories=async(req,res)=>{
    try {
        const categories=await Category.find({})
        res.status(200).json(categories)
        
    } catch (error) {
        console.log('Error in fetching categories', error);
        res.status(400).json(error)
    }

}

exports.createCategory=async(req,res)=>{
    try {
        const category=await Category.create(req.body)
        res.status(201).json(category)
        
    } catch (error) {
        console.log('Error in creating new category', error);
        res.status(400).json(error)
        
    }
}