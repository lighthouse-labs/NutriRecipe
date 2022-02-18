import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Rating } from '@mui/material';
import CustomizedRating from './Rating';
import AverageRating from './AverageRating';

export default function RecipeCard(props) {
  return (
    <Card elevation={10}   sx={{ height: "auto" }}>
        <CardMedia
          component="img"
          height="290"
          image={props.selectRecipe.image_url}
          alt="recipe-image"
        />
      <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.selectRecipe.name}
          </Typography>
          <CustomizedRating/> 
          <AverageRating list={props.selectRecipe}
                ratings={props.ratings}/>      
          <Typography variant="body2" color="text.secondary">
            {props.selectRecipe.description}
          </Typography>
        </CardContent>
    </Card>
  );
}
