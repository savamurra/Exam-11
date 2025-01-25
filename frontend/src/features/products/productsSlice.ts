import {createSlice} from "@reduxjs/toolkit";
import {Product} from "../../types";
import {createProduct, getOneProduct, getProduct} from "./productsThunks.ts";
import {RootState} from "../../app/store.ts";

interface ProductsSlice {
    products: Product[];
    oneProduct: Product | null;
    getLoading: boolean;
    getOneLoading: boolean;
    createLoading: boolean;
}

const initialState: ProductsSlice = {
    products: [],
    oneProduct: null,
    getLoading: false,
    getOneLoading: false,
    createLoading: false,
}

export const selectProducts = (state: RootState) => state.products.products;
export const selectLoading = (state: RootState) => state.products.getLoading;
export const selectOneProduct = (state: RootState) => state.products.oneProduct;
export const selectCreateLoading = (state: RootState) => state.products.createLoading;

const productsSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProduct.pending, (state) => {
                state.getLoading = true;
            })
            .addCase(getProduct.fulfilled, (state, {payload: products}) => {
                state.getLoading = false;
                state.products = products;
            })
            .addCase(getProduct.rejected, (state) => {
                state.getLoading = false;
            })
            .addCase(getOneProduct.pending, (state) => {
                state.getOneLoading = true;
            })
            .addCase(getOneProduct.fulfilled, (state, {payload: oneProduct}) => {
                state.getOneLoading = false;
                state.oneProduct = oneProduct;
            })
            .addCase(getOneProduct.rejected, (state) => {
                state.getOneLoading = false;
            })
            .addCase(createProduct.pending, (state) => {
                state.createLoading = true;
            })
            .addCase(createProduct.fulfilled, (state) => {
                state.createLoading = false;
            })
            .addCase(createProduct.rejected, (state) => {
                state.createLoading = false;
            });
    }
});

export const productsReducer = productsSlice.reducer;
