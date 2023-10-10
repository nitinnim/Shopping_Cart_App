
import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import Rating from './Rating'
import { CartState } from '../context/Context';

const SingleProduct = ({product}) => {

  const {state:{cart},dispatch} = CartState(); 

  return (
    <div className="border rounded-sm">
      <img src={product.image} className="h-[282px]" />

      <div className="p-4">

        <p className='text-[20px]'>{product.prodNames}</p>
        <p className='text-sm'>${product.price}</p>
        {
          product.fastDelivery ? (
            <p>Fast Delivery</p>  
          ) : (
            <p>4 days delivery</p>
          )
        }
        <div className="flex">
          {
            [...Array(5)].map((_,i) => {
                return <span key={i}>
                    {
                        product.rating > i ? (
                            <AiFillStar fontSize="15px" />
                        ) : (
                            <AiOutlineStar fontSize="15px" />
                        )
                    }
                </span>
            })
          }
        </div>

        {/* <Rating rating={product.rating}></Rating> */}
        
        {
          cart.some(p => p.id === product.id) ? (
            <button
             className='bg-red-400 text-black p-2 rounded mt-2'
             onClick={() => {
              dispatch({type:"REMOVE_FROM_CART",payload:product})
              }}
             >Remove from Cart
            </button>
          ) : (
            <button 
              disabled={!product.inStock}
              className='bg-blue-600 text-white p-2 rounded mt-2'
              onClick={() => {
                dispatch({type:"ADD_TO_CART",payload:product})
              }}
            >
            {product.inStock ? ("Add to Cart") : ("Out of Stock")}
            </button>
          )
        }
      </div>
    </div>
  )
}

export default SingleProduct
