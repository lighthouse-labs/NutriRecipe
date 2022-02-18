import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "./Button";
import Rating from "./Rating";
import "../App.css";

export default function RecipeListItem(props) {
  const {
    id,
    name,
    description,
    ingredients,
    steps,
    serving_size,
    estimated_time,
    rating,
    image_url,
  } = props.recipe;

  const viewRecipe = () => {
    props.setSelectRecipe({ ...props.recipe });
  };
  const [readMore, setReadMore] = useState(false);
  return (
    <Card
      className="recipe-card"
      elevation={20}
      sx={{ maxWidth: "500", height: "auto" }}
    >
      <CardMedia component="img" alt="photo" height="250" image={image_url} />
      <CardContent
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography gutterBottom variant="h8" component="div">
          {name}
          <Rating></Rating>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {readMore ? description : `${description.substring(0, 70)}...`}
          <button
            style={{ background: "transparent", border: "none" }}
            onClick={() => setReadMore(!readMore)}
          >
            {readMore ? "show less" : "read more"}
          </button>
        </Typography>
      </CardContent>
      <CardActions className="view-recipe-button">
        <Button size="small" onClick={props.viewRecipe || viewRecipe} style={{ marginBottom: -50 }}>
          View Recipe
        </Button>

      </CardActions>
    </Card>
  );
}
