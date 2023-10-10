import React from 'react'
import { CartState } from '../context/Context'
import SingleProduct from './SingleProduct'
import Filter from './Filter'

const Home = () => {
 
    const {
      state:{allProducts},
      productState:{byStock,byFastDelivery,byRating,sort,searchQuery},
    } = CartState();
    
    const transformProduct = () => {
      let sortedProduct = allProducts;

      if(sort){
        sortedProduct = sortedProduct.sort((a,b) => (
          sort === "LowToHigh" ? a.price - b.price : b.price - a.price
        ));
      }

      if(!byStock){
        sortedProduct = sortedProduct.filter((e) => e.inStock)
      }

      if(byFastDelivery){
        sortedProduct = sortedProduct.filter((e) => e.byFastDelivery)
      }

      if(byRating) {
        sortedProduct = sortedProduct.filter((e) => e.rating >= byRating)
      }
 
      if(searchQuery){
        sortedProduct = sortedProduct.filter((e) => 
          e.prodNames.toLowerCase().includes(searchQuery)
        );
      }

      return sortedProduct;
    }

  return (
    <div className="flex">

      {/* Filters */}
      <Filter></Filter>


      {/* AllProducts */}
      <div className="grid m-[10px] grid-cols-3 gap-4 w-[77%] mx-auto">
        {
          transformProduct().map((product) => {
            return <SingleProduct product={product} key={product.id}></SingleProduct>;
          })
        }
      </div>


    </div>
  )
}

export default Home
