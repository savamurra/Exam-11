import express from 'express';
import Category from "../models/Category";
import Product from "../models/Product";

const categoriesRouter = express.Router();

categoriesRouter.get('/', async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.send(categories);
    } catch (e) {
        next(e);
    }
});

categoriesRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const product = await Product.find({category: id});
        res.send(product);
    } catch (e) {
        next(e);
    }
});

export default categoriesRouter;