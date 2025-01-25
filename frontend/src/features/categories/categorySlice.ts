import {createSlice} from "@reduxjs/toolkit";
import {Category, Product} from "../../types";
import {getCategories, getProductByCategoryId} from "./categoryThunks.ts";
import {RootState} from "../../app/store.ts";

interface CategoriesState {
    categories: Category[];
    products: Product[];
    getLoading: boolean;
}

const initialState: CategoriesState = {
    categories: [],
    products: [],
    getLoading: false,
}

export const selectCategory = (state: RootState) => state.categories.categories;
export const selectProductByCategory = (state: RootState) => state.categories.products;
const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.getLoading = true;
            })
            .addCase(getCategories.fulfilled, (state, {payload: categories}) => {
                state.getLoading = false;
                state.categories = categories;
            })
            .addCase(getCategories.rejected, (state) => {
                state.getLoading = false;
            })
            .addCase(getProductByCategoryId.pending, (state) => {
                state.getLoading = true;
            })
            .addCase(getProductByCategoryId.fulfilled, (state, {payload: products}) => {
                state.getLoading = false;
                state.products = products;
            })
            .addCase(getProductByCategoryId.rejected, (state) => {
                state.getLoading = false;
            })
    }
})

export const categoriesReducer= categorySlice.reducer;