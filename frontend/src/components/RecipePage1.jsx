import  React, {useState}  from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import IngredientTable from "./IngredientTable"
import RecipeSteps from './RecipeSteps';
import NutriContent from './NutriContent';
import './recipePage.css'
import DisplayComments from './DisplayComments';
import RecipeCard from './RecipeCard';
import Button from '@mui/material/Button';
import AddComment from './AddComment';


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  border: "none",
  boxShadow: "none"
}));

export default function Recipe(props) {

  const [showComments, setShowComments] = useState(false);
  const openComments = () => setShowComments(true);
  const closeComments = () => setShowComments(false);

   const [showNewComment, setShowNewComment] = useState(false);
  const openNewComment = () => setShowNewComment(true);
  const closeNewComment = () => setShowNewComment(false);

  const buttonStyle = {margin: '10px 0 0 0'}

  // const renderComments = () => {
  //   if (showComments === true) {
  //     return <DisplayComments hideComments={closeComments} comments={props.comments} list={props.selectRecipe} />
    
  //   } else {
  //     return <Button onClick={openComments} style={buttonStyle} variant='contained' color='primary'>View Comments</Button>

  //   }     
  // }
  const renderNewComment = () => {
    if (showNewComment === true) {
      return <AddComment hideComment={closeNewComment} list={props.selectRecipe} />
    
    } else {
      return <Button onClick={openNewComment} style={buttonStyle} variant='contained' color='primary'>Add Comment</Button>

    }
      
        
    
  }


  return (
    <>
    <Box sx={{  backgroundColor: '#ffffff', display: 'flex', flexWrap: 'no-wrap', flexDirection: "row", padding: 5 }}>
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
        <Grid item xs={8}>
          <Item><RecipeSteps list={props.selectRecipe}/></Item  >
          </Grid> 
          <Grid item xs={4}>
          {renderNewComment()}
          </Grid>
        <Grid xs={4}>
          <DisplayComments hideComments={closeComments} comments={props.comments} list={props.selectRecipe} />
          </Grid>  
          
        <Grid item xs={8}>
          {props.selectRecipe.user_id===props.user.id && <Button onClick={props.onEdit}> Edit </Button>}
          {props.selectRecipe.user_id===props.user.id && <Button onClick={props.onDelete}>Delete</Button>}
          </Grid>
          
          

        </Grid>
      </Box>
    </>
  );
}