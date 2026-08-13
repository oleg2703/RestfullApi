import express from "express";
import productRoutes from './routes/products';
import ordersRoutes from './routes/orders'
const app = express();


app.use("/products", productRoutes);
app.use("/orders", ordersRoutes);


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