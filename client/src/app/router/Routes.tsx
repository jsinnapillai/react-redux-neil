import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import About from "../../features/about/About";
import ContactPage from "../../features/contact/ContactPage";
import ServerError from "../../api/errors/ServerError";
import NotFound from "../../api/errors/NotFound";
import BasketPage from "../../features/Basket/BasketPage";
import CheckoutPage from "../../features/checkout/CheckoutPage";

export const router = createBrowserRouter([
     {
        path:'/',
        element:<App/>,
        children:[
            {path:'',element:<HomePage/>},
            {path:'catalog',element:<Catalog/>},
            {path:'catalog/:id',element:<ProductDetails/>},
            {path:'about',element:<About/>},
            {path:'contact',element:<ContactPage/>},
            {path:'server-error',element:<ServerError/>},
            {path:'not-found',element:<NotFound/>},

            {path:'basket',element:<BasketPage/>},
            {path:'checkout',element:<CheckoutPage/>},

            
            {path:'*',element:<Navigate replace to="/not-found" />}




            
        ]

    }
])