
import React, { useState } from 'react'
import Rating from './Rating';
import { CartState } from '../context/Context';

const Filter = () => {

    const {productState:{byStock,byFastDelivery,byRating,sort}, productDispatch} = CartState();
    console.log(byStock,byFastDelivery,byRating,sort);

    const [filterData,setFilterData] = useState({
        radioButtonValue: '',
        outOfStock: false,
        fastDelivery: false,
    });
    // console.log(filterData);

    function changeHandler(event) {
        const{name,value,checked,type} = event.target;

        setFilterData(prevData => {
            return {
                ...prevData,
                [name] : type === 'checkbox' ? checked : value
            }
        })
    }

    // function onClick(i) {
    //     setRating(i+1);
    // }
 
  return (
    <div className="bg-slate-700 m-[10px] h-[87vh] text-white px-3 pt-6 w-[20%]">
      <h2 className='text-3xl mb-8'>Filter Products</h2>

        {/* Filter Form */}
        <div className="flex flex-col h-[600px] gap-6">

            {/* radio-button-1 */}
            <div>
                <input 
                    type="radio"
                    name='radioButtonValue'
                    id='radioButtonValue'
                    value="ascending"
                    // onChange={changeHandler}
                    onChange={() => {
                        productDispatch({
                            type: 'SORT_BY_PRICE',
                            payload: 'LowToHigh',
                        })
                    }}
                    checked={sort === "LowToHigh" ? true : false}
                    className='mr-1 cursor-pointer'
                />
                <label htmlFor="radioButtonValue">Ascending</label>
            </div>
            {/* radio-button-2 */}
            <div>
                <input 
                    type="radio"
                    name='radioButtonValue'
                    id='radioButtonValue'
                    value="descending"
                    onChange={() => {
                        productDispatch({
                            type: 'SORT_BY_PRICE',
                            payload: 'HighToLow',
                        })
                    }}
                    className='mr-1 cursor-pointer'
                    checked={sort === "HighToLow" ? true : false}
                />
                <label htmlFor="radioButtonValue">Descending</label>
            </div>


            {/* Checkbox-1 */}
            <div>
                <input 
                    type="checkbox"
                    name='outOfStock'
                    id='outOfStock'
                    checked={byStock}
                    onChange={() => {
                        productDispatch({
                            type: 'FILTER_BY_STOCK',
                        })
                    }}
                    className='mr-1 cursor-pointer'
                />
                <label htmlFor="outOfStock">Include Out Of Stock</label>
            </div>

            {/* Checkbox-2 */}
            <div>
                <input 
                    type="checkbox"
                    name='fastDelivery'
                    id='fastDelivery'
                    checked={byFastDelivery}
                    onChange={() => {
                        productDispatch({
                            type: 'FILTER_BY_DELIVERY',
                        })
                    }}
                    className='mr-1 cursor-pointer'
                />
                <label htmlFor="fastDelivery">Fast Delivery Only</label>
            </div>

            <div className="flex items-center">
                <label className='inline-block mr-2'>Rating: </label>
                <Rating rating={byRating} onClick={(i) => 
                    productDispatch({
                        type: "FILTER_BY_RATING",
                        payload: i+1,
                    })
                }></Rating>
            </div>

            <button
                className='bg-white text-gray-400 w-full py-2 rounded'
                onClick={() => {
                    productDispatch({
                        type: "REMOVE_FILTER"
                    })
                }}
                >Clear Filters
            </button>

        </div>
    </div>
  )
}

export default Filter
