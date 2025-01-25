import {Card, CardContent, CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import {useEffect} from "react";
import {getOneProduct} from "../productsThunks.ts";
import {useParams} from "react-router-dom";
import {useAppDispatch} from "../../../app/hooks.ts";
import {useSelector} from "react-redux";
import {selectOneProduct} from "../productsSlice.ts";
import {apiUrl} from "../../../globalConstants.ts";

const OneProduct = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const product = useSelector(selectOneProduct);
    const image = apiUrl + '/' + product?.image;
    useEffect(() => {
        if (id) {
            dispatch(getOneProduct(id))
        }
    }, [dispatch, id]);
    return product &&(
        <Grid key={product._id} sx={{
            maxWidth: 500,
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.6)",
            marginTop: 5,
            p: 2,
            background:"linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c);)"
        }}>
            <Card>
                <CardMedia
                    style={{width: "268px" ,height:'268px'}}
                    component="img"
                    image={image}
                    title={product.image}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{color: '#3f87a6'}}>
                        {product.title}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div" sx={{color: '#3f87a6'}}>
                        {product.description}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div" sx={{color: '#3f87a6'}}>
                        {product.sellerInfo.displayName}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div" >
                        Price: {product.price} $
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default OneProduct;