import { Box, Button, Grid, IconButton,  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useStoreContext } from "../../api/context/StoreContext";
import agent from "../../api/agent";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { Product } from "../../app/models/product";
import { BasketItem } from "../../app/models/basket";
import BasketSummary from "./BasketSummary";
import { currencyFormat } from "../../app/util/util";
import { Link } from "react-router-dom";

const BasketPage = () => {
const {basket,setBasket,removeItem} = useStoreContext()
const [status,setStatus] = useState({
  loading:false,
  name:''
});


const handleAddItem =   (productId:number,iconname:string) => { 
  setStatus({loading:true,name:iconname});
  agent.Basket.addItem(productId,1)
  .then(response => setBasket(response) )
  .catch(error => console.log(error))
  .finally(()=>  setStatus({loading:false,name:iconname}));
}


const handleRemoveItem =   (productId:number,quantity = 1,iconname:string) => { 
  setStatus({loading:true,name:iconname});
  agent.Basket.removeItem(productId,quantity)
  .then(() => removeItem(productId,quantity) )
  .catch(error => console.log(error))
  .finally(()=>   setStatus({loading:false,name:iconname}));
 
}




  if (!basket) return <Typography variant="h3"  > Your basket is empty </Typography>




  return  (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}  >
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">SubTotal</TableCell>
            <TableCell align="right"> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {basket?.items.map((item:BasketItem) => (
            <TableRow
              key={item.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >

              <TableCell component="th" scope="row">
                <Box display="flex" alignItems="center"  >
                  <img src={item.pictureUrl} alt={item.name} style={{height:50,marginRight:20}}/>
                  <span>{item.name}</span>
                </Box>
              </TableCell>
              <TableCell align="right">{currencyFormat(item.price)}</TableCell>
              <TableCell align="center">
                {/* <Box display="flex" alignItems="center" > */}
                <LoadingButton color="error"  loading={status.loading && status.name === 'remove'+item.productId } onClick={() => handleRemoveItem(item.productId,1,'remove'+item.productId)}>
                    <Remove/>
                  </LoadingButton>
                {item.quantity}
                <LoadingButton color="secondary" loading={status.loading && status.name === 'add'+item.productId }  onClick={()=> handleAddItem(item.productId,'add'+item.productId )} >
               
                    <Add/>
                  </LoadingButton>
                {/* </Box> */}
                </TableCell>
              <TableCell align="right">${((item.quantity/100) * item.price).toFixed(2)}</TableCell>
              <TableCell align="right">
              <LoadingButton color="error" loading={status.loading && status.name === 'del'+item.productId }  onClick={()=> handleRemoveItem(item.productId,item.quantity,'del'+item.productId)} >
                <Delete/>
              </LoadingButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Grid container >
          <Grid item xs={6} ></Grid>
          <Grid item xs={6} >
            <BasketSummary/>
            <Button component={Link} to="/checkout" variant="contained" fullWidth size="large" > Checkout</Button>
          </Grid>

    </Grid>
    </>

  )
};

export default BasketPage;
