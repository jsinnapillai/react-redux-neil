import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";
import { useState } from "react";
import agent from "../../api/agent";
import { LoadingButton } from '@mui/lab';
import { useStoreContext } from "../../api/context/StoreContext";
import { Rootstate, useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, setBasket } from "../Basket/BasketSlice";

interface Props {
    product : Product
}

const ProductCard = ({product}:Props) => {
  const {basket,status} = useAppSelector((state:Rootstate) => state.basket  )
  const dispatch = useAppDispatch();

 


  return (
    <>
 <Card >
    <CardHeader
        avatar = {
            <Avatar sx={{bgcolor:"secondary.main"}}>
                {product.name.charAt(0).toLocaleUpperCase()}
            </Avatar>
        }
        title= {product.name}
        titleTypographyProps={{sx: {fontWeight:"bold",color:"primary.main"}}}
    />
      <CardMedia
        sx={{ height: 140,backgroundSize:'contain',bgcolor:"primary.light" }}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5" >
        ${(product.price/100).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton loading={status.includes("pendingAddItem"+product.id)  } size="small" onClick={() => dispatch(addBasketItemAsync({productId: product.id} ))} >Add to Cart</LoadingButton>
        <Button size="small" component = {Link} to={`/catalog/${product.id}`} >View</Button>
      </CardActions>
    </Card>
    </>
  );
};

export default ProductCard;
