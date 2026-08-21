import express from "express"
import mongoose from "mongoose";


import Order from '../models/orders'
import Product from '../models/products'


const router = express.Router();

router.get('/',(req,res,next)=>{
   Order.find()
   .select('product quantity _id')
   .populate('product','name')
   .exec()
   .then(docs=>{
    res.status(200).json({
        count:docs.length,
        order:docs.map(doc=>{
            return {
                _id:doc._id,
                product:doc.product,
                quantity:doc.quantity,
                request:{
                        type:"GET",
                        url:"http://localhost:4300/orders/"+doc._id
                    }
            }
        }),
        
    })
   })
   .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
})
router.post('/', async (req, res) => {
    try {
        const product = await Product.findById(req.body.productId).exec();
        if (!product) {
            res.status(404).json({
                message: "Product not found"
            });
            return;
        }

        const order = await new Order({
            _id: new mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            product: req.body.productId
        }).save();

        res.status(201).json({
            message: "Order stored",
            CreateOrder: order
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
});

router.get('/:orderId',(req,res,next)=>{
  Order.findById(req.params.orderId)
  .populate('product')
  .exec()
  .then(order=>{
    if(!order){
        return res.status(404).json({
            message:"Order not found"
        })
    }
    res.status(200).json({
        order:order,
        request:{
            type:"GET",
            url:"http://localhost:4300/orders"
        }
    })
  })
  .catch(err=>{
    res.status(500).json({
        error:err
    })
  })
})


router.delete('/:orderId', (req, res) => {
    Order.deleteOne({ _id: req.params.orderId })
        .exec()
        .then(result => {
            if (result.deletedCount === 0) {
                return res.status(404).json({
                    message: "Order not found"
                });
            }

            return res.status(200).json({
                message: "Order deleted successfully",
                request: {
                    type: "POST",
                    url: "http://localhost:4300/orders"
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.patch('/:orderId', (req, res) => {
    // Implement update logic here
});

export default router;