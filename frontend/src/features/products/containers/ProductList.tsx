import Grid from "@mui/material/Grid2";
import { Card, CardContent, CardMedia } from "@mui/material";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import { apiUrl } from "../../../globalConstants.ts";
import Box from "@mui/material/Box";
import {Product} from "../../../types";

interface ProductListProps {
    products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
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
        <Box sx={{ display: "flex", gap: 4, alignItems: "center", flexWrap: "wrap" }}>
            {products.map((product) => {
                const image = apiUrl + "/" + product.image;
                return (
                    <Grid
                        key={product._id}
                        sx={{
                            maxWidth: 300,
                            borderRadius: "10px",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.6)",
                            marginTop: 5,
                            p: 2,
                            background: "linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c)",
                        }}
                    >
                        <Card
                            component={NavLink}
                            to={`/product/${product._id}`}
                            style={{ textDecoration: "none" }}
                            key={product._id}
                        >
                            <CardMedia
                                style={{ width: "268px", height: "268px" }}
                                component="img"
                                image={image}
                                title={product.image}
                            />
                            <CardContent style={{ backgroundColor: "white" }}>
                                <Typography gutterBottom variant="h5" component="div" sx={{ color: "#3f87a6" }}>
                                    {product.title}
                                </Typography>
                                <Typography gutterBottom variant="h5" component="div">
                                    Price: {product.price} $
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                );
            })}
        </Box>
    );
};

export default ProductList;
