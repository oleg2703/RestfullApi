import express from 'express'
import Product from '../models/products'
import mongoose from 'mongoose';
import { error } from 'node:console';


const router = express.Router();

router.get('/',(req,res,next)=>{
    Product.find()
    .exec()
    .then(docs=>{
        console.log(docs);
        // if(docs.length>=0){
            res.status(200).json(docs);
        // }else{
        //     res.status(404).json({message:"No entries found"})
        // }
    })
    .catch(err=>{
    console.log(err);
     res.status(500).json({error:err})
    }
    );
});

router.post('/',(req,res,next)=>{
const product = new Product({
    _id: new mongoose.Types.ObjectId(),
     name:req.body.name,
        price:req.body.price
})
product.save().then((result)=>{
    console.log(result);
      res.status(201).json({
        message: "Create the product",
        CreateProduct: result
    });

}).catch(err=>{ 
    console.log(err);
    res.status(500).json({error:err})});
  
});


router.get('/:productId', (req, res) => {
    const id = req.params.productId;
    Product.findById(id)
    .exec()
    .then(doc=>{
        console.log("From the database",doc);
        if(doc){
            res.status(200).json(doc);
        }else{
            res.status(404).json({message:"No valid entry found for ID"});
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error:err})
    });
    
   
});
router.delete('/:productId', (req, res) => {
    const id = req.params.productId;

    Product.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Product deleted',
                result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});



export default router;