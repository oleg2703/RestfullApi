import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import productRoutes from './routes/products';
import ordersRoutes from './routes/orders'
import { MongoClient } from "mongodb";

const mongoUrl = process.env.MONGODB_URI || "mongodb+srv://Node:node-shop@restfullapi.23job8u.mongodb.net/?appName=RestFullApi";
const client = new MongoClient(mongoUrl)
mongoose.connect(mongoUrl).catch(err => {
    console.error('MongoDB connection error:', err.message);
   
});

const app = express();


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*") //Запити можуть приходити із різних url 
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Request-With,Content-Type,Accept ,Authorization");
        if( req.method === 'OPTIONS'){
         res.header("Access-Control-Allow-Method","PUT,GET,POST,PATCH,DELETE")
        }

    next();
})



//request routes
app.use("/products", productRoutes);
app.use("/orders", ordersRoutes);

// trow error
app.use((req,res,next)=>{
    const error = new Error('Not found');
    (error as any).status = 404;
    next(error);
});
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Internal Server Error'
        }
    });
});
export default app;