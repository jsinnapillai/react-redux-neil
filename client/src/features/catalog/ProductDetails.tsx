import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/product";
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import agent from "../../api/agent";
import NotFound from "../../api/errors/NotFound";
import LoadingComponents from "../../app/layout/LoadingComponents";
import { useStoreContext } from "../../api/context/StoreContext";
import { BasketItem } from "../../app/models/basket";
import { LoadingButton } from "@mui/lab";

const ProductDetails = () => {

  const {basket,setBasket,removeItem} = useStoreContext();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity,setQuantity] = useState(0);
  const [submitting,setSubmitting] = useState(false);

  const item = basket?.items.find((x: BasketItem )=> x.productId === product?.id)


  useEffect(() => {
    if(item) setQuantity(item.quantity);
    id && agent.Catalog.details( parseInt(id)).then(product => setProduct(product))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [id,item]);


  const handleInputchange = (event:ChangeEvent<HTMLInputElement>) => { 
    if(parseInt(event.currentTarget.value) >=0)
      setQuantity( parseInt(event.currentTarget.value))
    else 
    setQuantity(0)
  }


  const handleUpdateCart = () => {
    if(!product) return;
    setSubmitting(true)
    if (!item || quantity > item.quantity)
      {
        const updateQuantity = item ? quantity - item.quantity : quantity;
        agent.Basket.addItem(product.id!, updateQuantity  )
        .then(response => setBasket(response))
        .catch(error => console.log(error))
        .finally(() => setSubmitting(false))
      }
      else{
        const updateQuantity = item.quantity - quantity;
        agent.Basket.removeItem(product.id!, updateQuantity)
        .then(() => removeItem(product.id!, updateQuantity))
        .catch(error => console.log(error))
        .finally(() => setSubmitting(false))
      }

  }


  if (loading) return <LoadingComponents message="Loading Product" />
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
