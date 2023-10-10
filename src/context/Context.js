
import React, {createContext, useContext, useReducer} from 'react'
import { faker } from '@faker-js/faker';
import {cartReducer, productReducer} from "./Reducer"

export const Products = createContext();

faker.seed(30);
const Context = ({children}) => {

    const allProducts = [...Array(20)].map( () => ({
        id: faker.string.uuid(),
        prodNames: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.url(),
        inStock : faker.helpers.arrayElement([0,3,5,6,7]),
        fastDelivery: faker.datatype.boolean(),
        rating: faker.helpers.arrayElement([1,2,3,4,5])
    }) )

    const [state,dispatch] = useReducer(cartReducer,{
        allProducts: allProducts,
        cart: [],
    })

    const [productState, productDispatch] = useReducer(productReducer, {
      byStock: false,
      byFastDelivery: false,
      byRating: 0,
      searchQuery : "",
    });

  return (
    <Products.Provider value={{state,dispatch,productState, productDispatch}}>
      {children}
    </Products.Provider>
  )
}

export default Context

export const CartState = () => {
    return useContext(Products);
}
