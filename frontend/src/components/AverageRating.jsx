import * as React from "react";

const AverageRating = (props) => {
  let sum = 0;
  let avg = 0;
  let val = 0;
  console.log("**********", props);
  props.ratings.ratings.forEach((rating, i) => {
    if (props.list.id === rating.recipe_id) {
      console.log("%%%%%", rating.rating);
      sum += rating.rating;
      val++;
    }
    if (val > 0) {
      avg = sum / val;
    }
  });
  return <div>{avg}</div>;
};

export default AverageRating;
