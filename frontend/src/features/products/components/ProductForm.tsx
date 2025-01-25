import {ChangeEvent, useEffect, useState} from "react";
import {ProductMutation} from "../../../types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import FileInput from "../../../components/FileInput/FileInput.tsx";
import Button from "@mui/material/Button";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {selectUser} from "../../users/userSlice.ts";
import {selectCategory} from "../../categories/categorySlice.ts";
import {MenuItem} from "@mui/material";
import {getCategories} from "../../categories/categoryThunks.ts";
import {selectCreateLoading} from "../productsSlice.ts";
import Spinner from "../../../components/UI/Spinner/Spinner.tsx";
import {createProduct} from "../productsThunks.ts";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const initialState = {
    title: "",
    description: "",
    price: "",
    image: null as File | null,
    category: "",
    sellerInfo: ""
}


const ProductForm = () => {
    const [form, setForm] = useState<ProductMutation>(initialState);
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const category = useAppSelector(selectCategory);
    const loading = useAppSelector(selectCreateLoading);
    const navigate = useNavigate();



    useEffect(() => {
        if(!user) {
            navigate("/login");
        }
        dispatch(getCategories());
    }, [dispatch, user, navigate]);

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        if (user) {
            setForm((prevState) => ({...prevState, sellerInfo: user._id, [name]: value}));
        }
    };

    const fileEventChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;

        if (files) {
            setForm((prevState) => ({
                ...prevState,
                [name]: files[0] || null,
            }));
        }
    };

    const onSubmit =  (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.description.trim() || !form.image || !form.price.trim() || !form.category.trim() || !form.title.trim()) {
            return toast.error("Все поля обязательны к заполнению");
        } else {
            dispatch(createProduct(form)).unwrap();
            setForm(initialState);
            toast.success('Post was successfully created!');
            navigate('/')
        }
    }

    return (
        <>
            <Typography
                variant="h5"
                sx={{
                    mt: 4,
                    textAlign: "center",
                    fontWeight: "bold",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                    color: "#041f4e",
                }}
            >
                Add new product
            </Typography>
            <form onSubmit={onSubmit}>
                <Grid
                    container
                    direction="column"
                    spacing={3}
                    sx={{
                        maxWidth: 500,
                        margin: "0 auto",
                        mt: 4,
                        padding: "20px",
                        borderRadius: "20px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.9)",
                    }}
                >
                    <Grid>
                        <TextField
                            id="title"
                            name="title"
                            label="Title"
                            value={form.title}
                            onChange={inputChangeHandler}
                            required
                            fullWidth
                            sx={{
                                borderRadius: "8px",
                                "& .MuiInputBase-root": {
                                    backgroundColor: "#fff",
                                    borderRadius: "8px",
                                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                                },
                            }}
                        />
                    </Grid>

                    <Grid>
                        <TextField
                            id="description"
                            name="description"
                            label="Description"
                            value={form.description}
                            onChange={inputChangeHandler}
                            required
                            multiline
                            rows={4}
                            fullWidth
                        />
                    </Grid>
                    <Grid>
                        <TextField
                            id="price"
                            name="price"
                            label="Price"
                            type="number"
                            required
                            value={form.price}
                            onChange={inputChangeHandler}
                            InputProps={{
                                inputProps: {
                                    min: 0
                                }
                            }}
                        />
                    </Grid>
                    <Grid>
                        <FileInput
                            name="image"
                            label="Image"
                            onGetFile={fileEventChangeHandler}
                        />
                    </Grid>
                    <Grid size={8}>
                        <TextField
                            sx={{width: "100%"}}
                            required
                            id="category"
                            name="category"
                            select
                            label="Category"
                            value={form.category}
                            onChange={inputChangeHandler}
                        >
                            {category.map((option) => (
                                <MenuItem key={option._id} value={option._id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                background: "linear-gradient(#e66465, #9198e5);",
                                borderRadius: "20px",
                                textTransform: "uppercase",
                                padding: "12px",
                                "&:hover": {
                                    background: "linear-gradient(0.25turn, #e66465, #9198e5);)",
                                    transform: "scale(1.05)",
                                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
                                },
                            }}
                        >
                            {loading ? <Spinner /> : "Create"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default ProductForm;