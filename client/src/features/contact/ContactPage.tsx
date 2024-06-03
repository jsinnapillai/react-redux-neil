 
 
import { Button, ButtonGroup, Typography } from '@mui/material'
import { Rootstate, useAppDispatch, useAppSelector } from '../../app/store/configureStore'
import { decrement, increment } from './counterSlice';

const ContactPage = () => {
  const dispatch = useAppDispatch();
  const {data,title } = useAppSelector((state:Rootstate ) => state.counter)

  return (
    <>
   <Typography variant='h4' >{data}</Typography>
   <Typography variant='h4' >{title}</Typography>
   <ButtonGroup>
    <Button variant="contained" color="error" onClick={() => dispatch( decrement(1))} >Decrement</Button>
    <Button variant="contained" color="primary"  onClick={() => dispatch(increment(1))}>Increment</Button>
    <Button variant="contained" color="secondary"  onClick={() => dispatch(increment(5))}>Increment by 5</Button>


   </ButtonGroup>
   </>


  )
}

export default ContactPage