import React, { useEffect, useState } from 'react'
import {FaStar} from 'react-icons/fa'
import './newRatings.css'
import axios from 'axios'
import './displayRatings.css'

const DisplayRatings = (props) => {

  const [rating, setRating] = useState({});
  console.log('recipeid: ', props.recipe.name, props.recipe.average_rating);
  
  useEffect(() => {
    setRating(props.recipe.average_rating);
  }, [])
  
  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1
        
        let id = 1;
        return (
          <label>
            <input
              id = {id + 1}
              type="radio"
              name="rating"
              value={ratingValue}
            /> 
            <FaStar
              className='heart'
              color={ratingValue <= (rating) ? "#ffc107" : "#e4e5e9"} size={25} />

          </label>);
      })}      
    </div>
  )
}

export default DisplayRatings