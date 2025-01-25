import {Card, CardContent, CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import {useEffect} from "react";
import {deleteProduct, getOneProduct} from "../productsThunks.ts";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {selectOneProduct} from "../productsSlice.ts";
import {apiUrl} from "../../../globalConstants.ts";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {toast} from "react-toastify";
import {selectUser} from "../../users/userSlice.ts";

const OneProduct = () => {
    const {id} = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const product = useAppSelector(selectOneProduct);
    const navigate = useNavigate();
    const user = useAppSelector(selectUser);
    const image = apiUrl + '/' + product?.image;

    useEffect(() => {
        if (id) {
            dispatch(getOneProduct(id))
        }
    }, [dispatch, id]);


    const onDelete = async () => {
        try {
            if (id) {
                await dispatch(deleteProduct(id)).unwrap();
                toast.success("Product deleted successfully.");
                navigate("/");
            }
        } catch (error) {
            toast.error((error as { error: string }).error);
        }
    }

    return product && (
        <Grid key={product._id} sx={{
            maxWidth: 800,
            margin: "auto",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.6)",
            marginTop: 5,
            p: 2,
            background: "linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c);)"
        }}>
            <Card style={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
                <Box style={{padding: "10px", border: '2px solid #3f87a6', margin: "10px"}}>
                    <CardMedia
                        style={{width: "268px", height: '268px', boxShadow: "0 4px 12px rgba(0, 0, 0, 0.6)"}}
                        component="img"
                        image={image}
                        title={product.image}
                    />
                </Box>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{color: '#3f87a6'}}>
                        Title: {product.title}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div" sx={{color: '#3f87a6'}}>
                        Description: {product.description}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div" sx={{color: '#3f87a6'}}>
                        Category: {product.category.name}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div" sx={{color: '#3f87a6'}}>
                        Price: {product.price} $
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div" sx={{color: '#3f87a6'}}>
                        Seller: {product.sellerInfo.displayName}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div" sx={{color: '#3f87a6'}}>
                        + {product.sellerInfo.phoneNumber}
                    </Typography>
                    {user ? <Button variant="contained" style={{background: "#f69d3c"}} onClick={onDelete}>
                        Delete
                    </Button> : null}
                </CardContent>

            </Card>
        </Grid>
    );
};

export default OneProduct;