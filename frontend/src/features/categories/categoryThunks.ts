import {createAsyncThunk} from "@reduxjs/toolkit";
import {Category, Product} from "../../types";
import axiosApi from "../../axiosApi.ts";

export const getCategories = createAsyncThunk<Category[], void>(
    'category/getCategories', async () => {
        const categoryResponse = await axiosApi<Category[]>('/categories')
        return categoryResponse.data || [];
    },
);

export const getProductByCategoryId = createAsyncThunk<Product[], string>(
    'category/getProductByCategoryId', async (id: string) => {
        const productsResponse = await axiosApi<Product[]>(`/categories/${id}`);
        return productsResponse.data || [];
    },
);