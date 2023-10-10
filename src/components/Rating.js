import React from 'react'
import {AiFillStar,AiOutlineStar} from 'react-icons/ai'

const Rating = ({rating,onClick}) => {
  return (
    <div className="pt-2 cursor-pointer">
      {
        [...Array(5)].map((_,i) => {
            return <span key={i} onClick={() => onClick(i)} className="inline-block">
                {
                    rating > i ? (
                        <AiFillStar fontSize="15px" />
                    ) : (
                        <AiOutlineStar fontSize="15px" />
                    )
                }
            </span>
        })
      }
    </div>
  )
}

export default Rating
