import express from 'express'
import Product from '../models/products'
import mongoose from 'mongoose';
import { error } from 'node:console';
import { request } from 'node:http';


const router = express.Router();

router.get('/',(req,res,next)=>{
    Product.find()
    .select('name price _id')
    .exec()
    .then(docs=>{
        const response ={
            count:docs.length,
            product:docs.map(doc=>{
               return{
                name:doc.name,
                price:doc.price,
                _id:doc.id,
                request:{
                    type:"GET",
                    url:"http://localhost:4300/products/"+doc.id
                }
               } 
            })
        }
        res.status(200).json(response);
      
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
        message: "Create the product successful",
        CreateProduct: {
                name:result.name,
                price:result.price,
                _id:result.id,
                request:{
                    type:"GET",
                    url:"http://localhost:4300/products/"+result.id
}}});

}).catch(err=>{ 
    console.log(err);
    res.status(500).json({error:err})});
  
});


router.get('/:productId', (req, res) => {
    const id = req.params.productId;
    Product.findById(id)
    .exec()
    .then(doc=>{
        
        if(doc){
            res.status(200).json({
                name:doc.name,
                price:doc.price,
                _id:doc.id,
            });
        }else{
            res.status(404).json({message:"No valid entry found for ID"});
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error:err})
    });
    
   
});
router.patch('/:productId', (req, res) => {
    const id = req.params.productId;
    const updateOps: Record<string, any> ={};
    for(const ops of req.body){
        updateOps[ops.propName]=ops.value
    }
    Product.updateOne({_id:id},{$set:updateOps})
    .exec()
    .then(result=>{
        console.log(result);
       
            res.status(200).json({
                message:"Product updated",
                request:{
                    type:"GET",
                    url:"http://localhost:4300/products/"+id
                }
            });
      
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
                result:result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});



export default router;