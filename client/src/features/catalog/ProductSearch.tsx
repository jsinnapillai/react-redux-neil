import TextField from '@mui/material/TextField'
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore'
import { setProductParams } from './catalogSlice';
 
import { debounce } from '@mui/material';
import { useState } from 'react';
 

const ProductSearch = () => {
    const { productParams } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch()
    const [searchTerm,setSearchTerm ] = useState(productParams.searchTerm)

    const debounceedSearch = debounce((event: any ) => { 
        dispatch(setProductParams({searchTerm : event.target.value}))
    },1000)



  return (
     <TextField label="Search products" variant="outlined" fullWidth  value={ searchTerm || ''} 
     onChange={(event:any) =>{
        setSearchTerm(event.target.value );
        debounceedSearch(event);
     }}
     
     /> 
  )
}

export default ProductSearch