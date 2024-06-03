import LoadingComponents from '../../app/layout/LoadingComponents';
import { Rootstate, useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import ProductList from './ProductList';
import { useEffect } from 'react';
import { fetchProductAsync, productSelector } from './catalogSlice';
 

const Catalog = () => {
  const products = useAppSelector(productSelector.selectAll);
  const {productsLoaded,status} = useAppSelector((state:Rootstate) => state.catalog);
  const dispatch = useAppDispatch();
 

  useEffect(()=> {
    if(!productsLoaded) dispatch(fetchProductAsync());
  },[productsLoaded,dispatch])

  if (status.includes("pendingFetchProducts")) return <LoadingComponents/>

  return (
    <>
         <ProductList products={products}/> 
       
    </>
  )
}

export default Catalog