import axios from "axios";
import React, {useState, useEffect} from "react";

const AverageRating = (props) => {
  const [average, setAverage] = useState(props.list.average_rating)
  const [ratingsSource, setRatingsSource] = useState('')


  let sum = 0;
  let avg = 0;
  let val = 0;
  let roundedAvg = 0;
  const calculateAvgRatings = (ratings, recipes) => {
    ratings.forEach(element => {
      if (recipes.id === element.recipe_id) {
      sum += element.value;
        val++;
    }
      
    });     
    if (val > 0) {
      avg = sum / val;
    }
    
    roundedAvg = Math.round(avg * 10 / 10);
    console.log(roundedAvg)
    updateAvgRating({
      ...props.list,
      average_rating: roundedAvg
    })
    
  }

  const updateAvgRating = (recipe) => {
    axios.put(`recipes/${recipe.id}`, recipe)
      .then(resp => {
        console.log(resp.data.average_rating);
        setAverage(resp.data.average_rating);
    })
  }

  
  if (props.ratings) {
    console.log(props.ratings);
    calculateAvgRatings(props.ratings.ratings, props.list);

  }
 
  return <div>Average rating: {average ? average : null}</div>;
};

export default AverageRating;
