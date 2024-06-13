import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import NotFound from "../../api/errors/NotFound";
import LoadingComponents from "../../app/layout/LoadingComponents";
 
import { LoadingButton } from "@mui/lab";
import { Rootstate, useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "../Basket/BasketSlice";
import { fetchSingleProductAsync, productSelector } from "./catalogSlice";
 

const ProductDetails = () => {

  const {basket,status} = useAppSelector((state:Rootstate) => state.basket  )
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string}>();
  const product = useAppSelector((state:Rootstate) => productSelector.selectById(state, parseInt(id!)) )
  const {status:productStatus} = useAppSelector((state:Rootstate) => state.catalog  )

  const [quantity,setQuantity] = useState(0);
 

  const item = basket?.items.find((x)=> x.productId === product?.id)


  useEffect(() => {
    if(item) setQuantity(item.quantity);
    if(!product && id) dispatch(fetchSingleProductAsync(parseInt(id)))

 
 
  }, [id,item,dispatch,product]);


  const handleInputchange = (event:ChangeEvent<HTMLInputElement>) => { 
    if(parseInt(event.currentTarget.value) >=0)
      setQuantity( parseInt(event.currentTarget.value))
    else 
    setQuantity(0)
  }


  const handleUpdateCart = () => {
 
    if (!item || quantity > item.quantity)
      {
     
        const updateQuantity = item ? quantity - item.quantity : quantity;
        dispatch(addBasketItemAsync({productId : product.id ,quantity:updateQuantity}))
      }
      else{
        const updateQuantity = item.quantity - quantity;
        dispatch(removeBasketItemAsync({productId : item?.productId! ,quantity:updateQuantity}))

 
      }

  }


  if (productStatus.includes("pending")) return <LoadingComponents message="Loading Product" />
  if (!product) return <NotFound/>;

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3"> {product.name}</Typography>
        <Divider sx={{mb:2}}/>
        <Typography variant="h4" color="secondary" > {(product.price/100).toFixed(2)}</Typography>
        <TableContainer>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>{product.name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Description</TableCell>
                        <TableCell>{product.description}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Type</TableCell>
                        <TableCell>{product.type}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Brand</TableCell>
                        <TableCell>{product.brand}</TableCell>
                    </TableRow>       
                    <TableRow>
                        <TableCell>Quantity in Stock</TableCell>
                        <TableCell>{product.quantityInStock}</TableCell>
                    </TableRow>                                                                             
                </TableBody>
            </Table>
        </TableContainer>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <TextField onChange={handleInputchange}
                 variant="outlined"
                 type="number"
                 label="Quantity inStock"
                 fullWidth
                 value={ quantity }
                >
                </TextField>
            </Grid>
            <Grid item xs={6}>
                <LoadingButton 
                disabled={item?.quantity === quantity || (!item && quantity === 0 )}
                loading={status.includes("pending")}
                onClick={handleUpdateCart}
                 variant="contained"
                 color="primary"
                 size="large"
                 fullWidth
                > {item ? 'Update Quantity' : 'Add to Cart'}
                </LoadingButton>
            </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductDetails;
