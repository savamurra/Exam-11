import mongoose, {Schema} from "mongoose";
import config from "./config";
import User from "./models/User";
import Category from "./models/Category";
import Product from "./models/Product";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection("users");
        await db.dropCollection("categories");
        await db.dropCollection("products");
    } catch (error) {
        console.error(error);
    }

    const user = await User.create(
        {
            username: "Sanzhar",
            password: "123",
            displayName: "savammura",
            phoneNumber: "0709434325",
            token: crypto.randomUUID(),
        },
        {
            username: "Kamchy",
            password: "123",
            displayName: "kolya",
            phoneNumber: "0554394324",
            token: crypto.randomUUID(),
        }
    );

    const category = await Category.create(
        {
            name: "Computers"
        },
        {
            name: "Cars"
        },
        {
            name: "Clothes"
        },
        {
            name: "Phones"
        },
    );

    await Product.create([
        {
            title: 'Macbook',
            description: 'Air 13',
            price: 500,
            image: 'fixtures/macbook.jpg',
            category: category[0]._id,
            sellerInfo: user[0]._id
        },
        {
            title: 'Asus',
            description: 'Tuf Gaming',
            price: 700,
            image: 'fixtures/asus.jpg',
            category: category[0]._id,
            sellerInfo: user[0]._id
        },
        {
            title: 'Bmw',
            description: 'M5 competion',
            price: 1000,
            image: 'fixtures/bmw.jpg',
            category: category[1]._id,
            sellerInfo: user[0]._id
        },
        {
            title: 'Mersedes',
            description: 'w222',
            price: 7000,
            image: 'fixtures/mersedes.jpg',
            category: category[1]._id,
            sellerInfo: user[0]._id
        },
        {
            title: 'Football boots',
            description: 'Mercurial',
            price: 200,
            image: 'fixtures/shoes.jpg',
            category: category[2]._id,
            sellerInfo: user[1]._id
        },
        {
            title: 'Adidas',
            description: 'Predator',
            price: 350,
            image: 'fixtures/predator.jpg',
            category: category[2]._id,
            sellerInfo: user[1]._id
        },
        {
            title: 'Iphone',
            description: '16 pro max',
            price: 1500,
            image: 'fixtures/iphone.jpg',
            category: category[3]._id,
            sellerInfo: user[1]._id
        },
        {
            title: 'Samsung',
            description: 'S24 Ultra',
            price: 1700,
            image: 'fixtures/samsung.jpg',
            category: category[3]._id,
            sellerInfo: user[1]._id
        },
    ])

    await db.close();
};

run().catch((error) => {
    console.log(error);
})