import agent from '../../api/agent';
import LoadingComponents from '../../app/layout/LoadingComponents';
import { Product } from '../../app/models/product'
import ProductList from './ProductList';
import { useState, useEffect } from 'react';
 

const Catalog = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading,setLoading] = useState(true);

  useEffect(()=> {
    agent.Catalog.list()
    .then(products => setProducts(products))
    .catch((error) => console.log(error))
    .finally(() => setLoading(false))
  },[])

  if (loading) return <LoadingComponents/>

  return (
    <>
         <ProductList products={products}/> 
       
    </>
  )
}

export default Catalog