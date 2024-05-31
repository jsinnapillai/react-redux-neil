import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import About from "../../features/about/About";
import ContactPage from "../../features/contact/ContactPage";

export const router = createBrowserRouter([
     {
        path:'/',
        element:<App/>,
        children:[
            {path:'',element:<HomePage/>},
            {path:'catalog',element:<Catalog/>},
            {path:'catalog/:id',element:<ProductDetails/>},
            {path:'about',element:<About/>},
            {path:'contact',element:<ContactPage/>}

            
        ]

    }
])