 const express = require('express');
 const Product = require('../src/model/productModel');
 const getAllProducts = async(req,res)=>{
    try{
        const products = await Product.find();
        res.json(products);
        res.status(200);
    }
    catch{
        res.status(500).json({message: 'Server error'});
    }
 } 

const getId = async(req,res)=>{
    try{
        const products = await Product.findById(req.params.id);
        res.json(products);
        res.status(200);
    }
    catch{
        res.status(500).json({message: 'Server error'});
    }   
}   

const createProduct = async (req,res) =>{
   try{
    const product= await Product.insertMany(req.body);    
    res.status(201).json(product);
   }
   catch(error){
    res.status(400).json({message: error.message});
   }
}
  
const updateProduct = async (req,res)=>{
    try{
        const product= await Product.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).json(product);
    }
    catch{
        res.status(400).json({message: error.message});
    }
}

const deleteProduct = async (req,res)=>{
        try{
            await Product.findByIdAndDelete(req.params.id);
            res.status(200).json({message: 'Product deleted successfully'});
        }
        catch{
            res.status(400).json({message: error.message});
        }
    }

module.exports = {
    getAllProducts, getId, createProduct, updateProduct, deleteProduct
}