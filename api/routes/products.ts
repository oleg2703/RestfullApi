import express from 'express'
import Product from '../models/products'
import mongoose from 'mongoose';
import { error } from 'node:console';


const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message: "Get allProduct",
        body: req.body
    });
});

router.post('/',(req,res,next)=>{
const product = new Product({
    _id: new mongoose.Types.ObjectId(),
     name:req.body.name,
        price:req.body.price
})
product.save().then((result)=>{
    console.log(result);

}).catch(err=>console.log(err));
    res.status(200).json({
        message: "Create the product",
        CreateProduct: product
    });
});


router.get('/:productId', (req, res) => {
    const id =req.params.productId
    if(id==="pro"){
         res.status(200).json({
        message:"Get product pro",
        productId: id
    })
    }else{
         res.status(200).json({
        message:"Typing some id",
        productId: id
    })
    }
   
});
router.post('/:productId', (req, res) => {
     const id = req.params.productId
     if(id=='pro'){
         res.status(201).json({
        message:"Add product success",
        id:id
    })
    
     }else
     {
         res.status(200).json({
        message:" Product failed",
        id:id
    })
     }
   
});



export default router;