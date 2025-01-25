import mongoose, {HydratedDocument} from "mongoose";
import {Category} from "../types";

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: async function (this: HydratedDocument<Category>, name: string): Promise<boolean> {
                if (!this.isModified('name')) return true;
                const category: HydratedDocument<Category> | null = await Category.findOne({name});
                return !Boolean(category);
            },
            message: 'This category is already exists!',
        }
    }
})

const Category = mongoose.model('Category', CategorySchema);
export default Category;