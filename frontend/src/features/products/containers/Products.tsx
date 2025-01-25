
import {selectProducts} from "../productsSlice.ts";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {useEffect} from "react";
import {getProduct} from "../productsThunks.ts";
import Box from "@mui/material/Box";
import Categories from "../../categories/containers/Categories.tsx";
import { useParams} from "react-router-dom";
import {getProductByCategoryId} from "../../categories/categoryThunks.ts";
import {selectProductByCategory} from "../../categories/categorySlice.ts";
import ProductList from "./ProductList.tsx";

const Products = () => {
    const dispatch = useAppDispatch();
    const products = useAppSelector(selectProducts);
    const productsByCategory = useAppSelector(selectProductByCategory);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        dispatch(getProduct());
        if (id) {
            dispatch(getProductByCategoryId(id))
        }
    }, [dispatch,id]);

    return (
        <>
            <Box sx={{display: "flex", gap: 5}}>
                <Box sx={{mt: "40px"}}
                >
                    <Categories/>
                </Box>
                {id ? (
                    <ProductList products={productsByCategory} />
                ) : (
                    <ProductList products={products} />
                )}
            </Box>

        </>
    );
};

export default Products;