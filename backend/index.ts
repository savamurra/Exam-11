import express from "express";
import mongoose from "mongoose";
import mongoDb from "./mongoDb";
import usersRouter from "./routers/users";
import cors from "cors";
import categoriesRouter from "./routers/categories";
import productsRouter from "./routers/products";

const app = express();
const port = 8000;


app.use(cors());
app.use(express.json());
app.use(express.static('public'));


app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);
app.use('/products', productsRouter);

const run = async () => {
    await  mongoose.connect('mongodb://localhost:27017/market');

    app.listen(port, () => {
        console.log(`Server started on port http://localhost:${port}`);
    });

    process.on('exit', () => {
        mongoDb.disconnect();
    });
};

run().catch(err => console.log(err));