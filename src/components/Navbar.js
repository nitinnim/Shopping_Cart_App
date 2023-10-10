import React, { useState } from 'react'
import {FaShoppingCart} from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { CartState } from '../context/Context';
import { AiFillCaretDown, AiFillDelete } from 'react-icons/ai';

const Navbar = () => {

    // const [searchText,setSearchText] = useState("");
    const {state:{cart},dispatch} = CartState();

    const {productState:{searchQuery},productDispatch} = CartState();


  return (
    <div className='flex p-5 bg-violet-950 justify-evenly items-center'>
      
        {/* Logo */}
        <div>
            <Link to="/" className="text-white text-2xl">Shopping Cart</Link>
        </div>

        {/* Search Bar */}
        <div className="">
            <input
                type="text"
                placeholder="Search Here..." 
                value={searchQuery} 
                onChange={(e) => {
                    productDispatch({
                        type: 'FILTER_BY_SEARCH',
                        payload: e.target.value,
                    })
                }}
                className='w-[400px] p-1 rounded' 
            />
        </div>

        {/* Carts */}
        <div className="group">
            <div className="bg-green-700 p-2 flex rounded items-center gap-2" >
                <FaShoppingCart className="text-violet-900"/>
                <p className="text-sm">({cart.length})</p>
                <AiFillCaretDown className="text-violet-900"/>
            </div>
            <div className='absolute rounded-sm hidden right-[230px] bg-gray-100 w-[350px] p-2 group-hover:block hover:block'>
                {
                    cart.length <= 0 ? (
                        <div>
                            Cart is Empty
                        </div>
                    ) : 
                    (
                        cart.map( (prod) => {
                            return <div className="flex flex-col mb-4">
                                <div className="flex items-center px-5 justify-between">
                                        <img src={prod.image} className="rounded-full w-[50px] bg-cover mr-4 h-[50px]" />
                                        <div className='flex-1'>
                                            <p className="">{prod.prodNames}</p>
                                            <p>{prod.price}</p>
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
                            </div> 
                        } )
                    )
                }
                {
                    cart.length > 0 ? (
                        <Link to="/cart">
                            <button
                                className='w-full bg-blue-500 rounded p-2 text-white'
                            >
                            Go To Cart
                            </button>
                        </Link>
                    ) : (
                        <div></div>
                    )
                }
            </div>
        </div>

    </div>
  )
}

export default Navbar
