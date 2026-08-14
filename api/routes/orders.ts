import express from "express"

const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:"Get AllOrders success" 
    })
})
router.post('/',(req,res,next)=>{
    const order= {
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    res.status(200).json({
        message:"Add new order" ,
        CreateOrder: order
    })
})


export default router