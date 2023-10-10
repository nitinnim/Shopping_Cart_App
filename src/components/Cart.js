import React, { useEffect, useState } from 'react'
import { CartState } from '../context/Context'
import { AiFillDelete, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {

  const {state:{cart},dispatch} = CartState();
  console.log(cart)

  const navigate = useNavigate();
  const [total,setTotal] = useState(0);
  useEffect(() => {
    setTotal(cart.reduce( (acc,product) => (acc + Number(product.price)*product.qty),0));
  } ,[cart])

  return (
    <div className='flex'>
      {/* Left Part */}
      <div className='w-[78%] m-[10px]'>

        {
          cart.map(  (prod) => (
            <div className="flex items-center justify-around border p-3 mb-4">
              <img src={prod.image} className="w-[120px] h-[80px]" />

              <div className="flex justify-around flex-1">

                <p>{prod.prodNames}</p>
                <p>${prod.price}</p>

                <div className="flex">
                  {
                    [...Array(5)].map((_,i) => {
                        return <span key={i}>
                            {
                                prod.rating > i ? (
                                    <AiFillStar fontSize="15px" />
                                ) : (
                                    <AiOutlineStar fontSize="15px" />
                                )
                            }
                        </span>
                    })
                  }
                </div>

                <select name="quantity" id="quantity" value={prod.qty} className='border w-[100px]'
                  onChange={(e) => {
                    dispatch({
                      type: 'CHANGE_QUANTITY',
                      payload:{
                        id: prod.id,
                        qty: e.target.value,
                      }
                    })
                  }}
                >
                  {
                    [...Array(prod.inStock).keys()].map((x) => (
                      <option key={x+1} value={x+1}>{x+1}</option>
                    ))
                  }
                </select>

              </div>

                <AiFillDelete
                  fontSize="20px"
                  className='cursor-pointer'
                  onClick={ () => {
                    dispatch({
                      type: "REMOVE_FROM_CART",
                      payload: prod,
                    })
                  } }
                />
            </div>
          ))
        }
      </div>

      {/* Right Part */}

      {

        cart.length > 0 ? (
          <div className="bg-slate-700 m-[10px] h-[87vh] text-white px-3 pt-6 w-[20%]">
          <p className='text-2xl mb-6'>Subtotal ({cart.length}) items</p>

          <p className='font-bold mb-3'>Total: ${total}</p>

          <Link to="/">
          <button className="rounded bg-blue-500 text-white w-full p-2">Procced to Checkout</button>          
          </Link>
        </div>
        ) : (
          navigate("/")
        )


      }

    </div>
  )
}

export default Cart
