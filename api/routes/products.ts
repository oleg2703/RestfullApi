import express from 'express'
const router = express.Router();


router.get('/',(req,res,next)=>{
    res.status(200).json({
        message: "Get allProduct",
        body: req.body
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