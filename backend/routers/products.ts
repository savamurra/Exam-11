import express from "express";
import Product from "../models/Product";
import {imagesUpload} from "../multer";
import Category from "../models/Category";
import auth, {RequestWithUser} from "../middleware/auth";
import {Error} from "mongoose";

const productsRouter = express.Router();

productsRouter.get('/', async (req, res, next) => {
    try {
        const products = await Product.find()
        res.send(products);
    } catch (e) {
        next(e);
    }
});

productsRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;

    if (!req.params.id) {
        res.status(404).send('Product Not Found');
    }

    try {
        const product = await Product.findById(id).populate("category", '-_id name').populate("sellerInfo", "-_id displayName phoneNumber");
        if (!product) res.status(404).send('Not Found');
        res.send(product);
    } catch (e) {
        next(e);
    }
})

productsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
    const expressReq = req as RequestWithUser;

    const user = expressReq.user;

    if (req.body.category) {
        const category = await Category.findById(req.body.category);
        if (!category) res.status(404).send('Not Found category');
    }

    const newProduct = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        image: req.file ? 'images' + req.file.filename : null,
        category: req.body.category,
        sellerInfo: user._id,
    };

    try {
        const product = new Product(newProduct);
        await product.save();
        res.send(product);
    } catch (e) {
        if (e instanceof Error.ValidationError) {
            res.status(400).send(e);
            return;
        }
        next(e);
    }
});

productsRouter.delete('/:id', auth, async (req, res, next) => {
    const expressReq = req as RequestWithUser;

    const user = expressReq.user;
    const id = req.params.id;

    try {
        const currentProduct = await Product.findById(id);

        if (!currentProduct) {
            res.status(404).send('Not Found');
            return;
        }

        if (currentProduct) {
            if (currentProduct.sellerInfo.toString() !== user._id.toString()){
                res.status(403).send({error: 'You can not delete this product'});
                return
            }
        }

        const product = await Product.findByIdAndDelete({_id: id})
        res.send({message: 'Product deleted successfully', product});

    } catch (e){
        next(e);
    }
})
export default productsRouter;