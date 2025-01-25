import {createAsyncThunk} from "@reduxjs/toolkit";
import {GlobalError, Product, ProductMutation} from "../../types";
import axiosApi from "../../axiosApi.ts";
import {RootState} from "../../app/store.ts";
import {isAxiosError} from "axios";

export const getProduct = createAsyncThunk<Product[], void>(
    'product/getProduct', async () => {
        const productResponse = await axiosApi<Product[]>('/products')
        return productResponse.data || [];
    },
);

export const getOneProduct = createAsyncThunk<Product, string>(
    'product/getOneProduct', async (id) => {
        const oneProductResponse = await axiosApi<Product>(`products/${id}`);
        return oneProductResponse.data
    });

export const createProduct = createAsyncThunk<void, ProductMutation, { state: RootState }>(
    "products/createProduct",
    async (productMutation, {getState}) => {
        const token = getState().users.user?.token;

        if (!token) {
            console.error("No token found");
        }

        const formData = new FormData();

        const keys = Object.keys(productMutation) as (keyof ProductMutation)[];

        keys.forEach((key) => {
            const value = productMutation[key];

            if (value !== null) {
                formData.append(key, value);
            }
        });

        await axiosApi.post("/products", formData, {headers: {Authorization: token}});
    },
);

export const deleteProduct = createAsyncThunk<void, string, { state: RootState; rejectValue: GlobalError }>(
    'product/deleteProduct', async (id: string, {getState, rejectWithValue}) => {
        try {
            const token = getState().users.user?.token;
            await axiosApi.delete(`/products/${id}`, {headers: {Authorization: token}});
        } catch (e) {
            if (isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data);
            }
            throw e;
        }

    },
);
