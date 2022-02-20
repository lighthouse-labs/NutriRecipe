import React, { useEffect, useState } from 'react'
import {FaStar} from 'react-icons/fa'
import './newRatings.css'
import axios from 'axios'

const NewRatings = (props) => {


  const [rating, setRating] = useState({});
  const [ratingStatus, setRatingStatus] = useState("");
  const [hover, setHover] = useState(null);
  

  const handleUserRating = (ratings) => {
    ratings.ratings.forEach(element => {
      if (props.user.id === element.user_id && props.list.id === element.recipe_id) {
        setRating(element);
      } else {
        setRating({});
      }
    });
  }

  useEffect(() => {
    handleUserRating(props.ratings);
  }, [props.ratings ]);
 

  const submitRating = (ratingObject) => {

    if (!ratingStatus) {
       axios.post("/ratings", ratingObject)
         .then(resp => {
        setRating(resp.data);
        setRatingStatus("done");
        props.handleMessage("Saved");
        props.setRatingUpdated(1);

      })
      
    } else {
      axios.put(`/ratings/${rating.id}`, ratingObject)
        .then(resp => {
          setRating(resp.data);
          setRatingStatus(true);
          props.setRatingUpdated(1);
           props.handleMessage("Saved")

      })
     
    }
  }

  const changeRating = (rating1) => {
      const rating = {
        user_id: props.user.id,
        recipe_id: props.list.id,
        value: rating1,
      }
      submitRating(rating);
  }



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
              onClick={() => changeRating(ratingValue)}
              
                
            /> 
            <FaStar
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
              className='heart'
              color={ratingValue <= (hover || rating.value) ? "#ffc107" : "#e4e5e9"} size={25} />
          </label>);
      })}      
    </div>
  )
}

export default NewRatings