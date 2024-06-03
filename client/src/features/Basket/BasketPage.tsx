import { Rootstate, useAppDispatch, useAppSelector } from '../../app/store/configureStore'
import {  addBasketItemAsync, removeBasketItemAsync } from './BasketSlice';
import { Box, Button, Grid,   Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Remove, Add, Delete } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { BasketItem } from '../../app/models/basket';
import { currencyFormat } from '../../app/util/util';
import BasketSummary from './BasketSummary';
import { Link } from 'react-router-dom';

const BasketPage = () => {
const {basket,status} = useAppSelector((state:Rootstate) => state.basket)
const dispatch = useAppDispatch();
 

 
 

if (!basket) return <Typography variant="h3"  > Your basket is empty </Typography>




  return (
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
                <LoadingButton color="error"  loading={status === ("pendingRemoveItem"+item?.productId+ 'rem') } onClick={() => dispatch(removeBasketItemAsync({productId:  item.productId,quantity:1,name:'rem'}))}>
                    <Remove/>
                  </LoadingButton>
                {item.quantity}
                <LoadingButton color="secondary" loading={status === ("pendingAddItem"+item?.productId ) }  onClick={()=> dispatch(addBasketItemAsync({productId:item.productId,quantity:1}))} >
               
                    <Add/>
                  </LoadingButton>
                {/* </Box> */}
                </TableCell>
              <TableCell align="right">${((item.quantity/100) * item.price).toFixed(2)}</TableCell>
              <TableCell align="right">
              <LoadingButton color="error" loading={status === ("pendingRemoveItem"+item?.productId)+'del' } onClick={() => dispatch(removeBasketItemAsync({productId:  item.productId,quantity:item.quantity,name:'del'  }))}>
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
}

export default BasketPage