const { Brand } = require("../models/brand");

exports.fetchBrands=async(req,res)=>{
    try {
        const brands=await Brand.find({})
        res.status(200).json(brands)
        
    } catch (error) {
        console.log('Error in fetching brands', error);
        res.status(400).json(error)
    }

}

exports.createBrand=async(req,res)=>{
    try {
        const brand=await Brand.create(req.body)
        res.status(201).json(brand)
        
    } catch (error) {
        console.log('Error in creating new brand', error);
        res.status(400).json(error)
        
    }
}