import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import IngredientTable from "./IngredientTable"
import RecipeSteps from './RecipeSteps';
import NutriContent from './NutriContent';
import DoughnutChart from "../charts/Doughnut";
import { Card } from '@mui/material';
import './recipePage.css'
import Comments from './Comments'
import DisplayComments from './DisplayComments';
import RecipeCard from './RecipeCard';
import Button from '@mui/material/Button';


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  border: "none",
  boxShadow: "none"
}));

export default function Recipe(props) {
  console.log(props.user);

  return (
    
    <Box sx={{  backgroundColor: '#ffffff', display: 'flex', flexWrap: 'no-wrap', flexDirection: "row", padding: 10 }}>
      <Grid container spacing={0.5}>
        <Grid  item xs={4}>
          <Item>
            <RecipeCard selectRecipe={props.selectRecipe} />
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item> <IngredientTable list={props.selectRecipe} /></Item>
        </Grid>
        <Grid item xs={4}>
          
          <Item>
            <NutriContent list={props.selectRecipe} />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item><RecipeSteps list={props.selectRecipe}/></Item  >
        </Grid>
        <Grid item xs={6}>
          <Item>
            {/* <Comments comments={props.comments} list={props.selectRecipe} /> */}
            <DisplayComments comments={props.comments} list={props.selectRecipe} />
          </Item>
        </Grid>
        {/* <Grid item xs={4}>
          {props.selectRecipe.user_id===props.user.id && <Button onClick={props.onEdit}> Edit </Button>}
          {props.selectRecipe.user_id===props.user.id && <Button onClick={props.onDelete}>Delete</Button>}
        </Grid> */}
      </Grid>
    
    </Box>
  );
}