import Box from "@mui/material/Box";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {useEffect} from "react";
import {getCategories} from "../categoryThunks.ts";
import {selectCategory} from "../categorySlice.ts";
import {NavLink} from "react-router-dom";
import Typography from "@mui/material/Typography";

const Categories = () => {

    const dispatch = useAppDispatch();
    const categories = useAppSelector(selectCategory);
    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    return (
        <>
            <Box sx={{
                display: "grid",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                padding: 2,
                backgroundColor: "#f5f5f5",
                borderRadius: "10px"
            }}>
                <Typography
                    variant="h6"
                    sx={{
                        textAlign: "center",
                        fontWeight: "bold",
                        color: "#3f87a6",
                        marginBottom: 2,
                    }}
                >
                    Categories
                </Typography>
                <NavLink to='/' style={{color: "#3f87a6", textDecoration: "none", padding: '5px'}}>
                    All Items
                </NavLink>
                {categories.map((category) => (
                    <NavLink style={{color: "#3f87a6", textDecoration: "none", padding: '5px'}} key={category._id} to={`/category/${category._id}`}>
                        {category.name}
                    </NavLink>
                ))}
            </Box>
        </>
    );
};

export default Categories;