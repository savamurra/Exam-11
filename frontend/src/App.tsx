import CssBaseline from "@mui/material/CssBaseline";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";
import Container from "@mui/material/Container";
import {Route, Routes} from "react-router-dom";
import RegisterPage from "./features/users/RegisterPage.tsx";
import LoginPage from "./features/users/LoginPage.tsx";
import Products from "./features/products/containers/Products.tsx";
import ProductForm from "./features/products/components/ProductForm.tsx";

const App = () => {


    return (
        <>
            <CssBaseline/>
            <header>
                <AppToolbar/>
            </header>
            <main>
                <Container maxWidth="xl">
                    <Routes>
                        <Route path='/' element={<Products/>}/>
                        <Route path='/add-new-product' element={<ProductForm/>}/>
                        <Route path="/register" element={<RegisterPage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="*" element={<h1>Not found</h1>}/>
                    </Routes>
                </Container>
            </main>
        </>
    );
};

export default App
