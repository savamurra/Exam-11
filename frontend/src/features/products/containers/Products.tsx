import {selectLoading, selectProducts} from "../productsSlice.ts";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {useEffect} from "react";
import {getProduct} from "../productsThunks.ts";
import Box from "@mui/material/Box";
import Categories from "../../categories/containers/Categories.tsx";
import {useParams} from "react-router-dom";
import {getProductByCategoryId} from "../../categories/categoryThunks.ts";
import {selectProductByCategory} from "../../categories/categorySlice.ts";
import ProductList from "./ProductList.tsx";
import Spinner from "../../../components/UI/Spinner/Spinner.tsx";
import Typography from "@mui/material/Typography";

const Products = () => {
    const dispatch = useAppDispatch();
    const products = useAppSelector(selectProducts);
    const productsByCategory = useAppSelector(selectProductByCategory);
    const loading = useAppSelector(selectLoading);
    const {id} = useParams<{ id: string }>();

    useEffect(() => {
        dispatch(getProduct());
        if (id) {
            dispatch(getProductByCategoryId(id));
        }
    }, [dispatch, id]);

    if (products.length === 0) {
        return (
            <Box sx={{marginTop: '40px'}}>
                <Typography variant="h3" component="div" style={{color:'#3f87a6'}}>
                    Not products yet
                </Typography>
            </Box>
        );
    }

    return (
        <>
            {loading ? <Spinner/> : <Box sx={{display: "flex", gap: 5}}>
                <Box sx={{mt: "40px"}}
                >
                    <Categories/>
                </Box>
                {id ? (
                    <ProductList products={productsByCategory}/>
                ) : (
                    <ProductList products={products}/>
                )}
            </Box>
            }
        </>
    );
};

export default Products;