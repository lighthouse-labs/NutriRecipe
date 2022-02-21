import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import AddIcon from '@mui/icons-material/Add';
import { Modal} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IngredientTable from "../IngredientTable";
import RecipeSteps from "../RecipeSteps";
import NutriContent from "../NutriContent";
import "../recipePage.css";
import DisplayComments from "../DisplayComments";
import RecipeCard from "../RecipeCard";
import Rating from "../Rating";
import AddComment from "../AddComment";
import AverageRating from "../AverageRating";



const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  border: "none",
  boxShadow: "none",
}));

export default function Recipe(props) {
  const [showComments, setShowComments] = useState(false);
  const openComments = () => setShowComments(true);
  const closeComments = () => setShowComments(false);

  const [showNewComment, setShowNewComment] = useState(false);
  const openNewComment = () => setShowNewComment(true);
  const closeNewComment = () => setShowNewComment(false);
  const [openAddComment, setOpenAddComment] = useState(false);
  const handleOpenComment = () => setOpenAddComment(true);
  const handleCloseComment = () => setOpenAddComment(false);

  const buttonStyle = { margin: "10px 0 0 0" };
  
  const renderNewComment = () => {
    if (showNewComment === true) {
      return (
        <AddComment fetchComments={props.fetchComments} hideComment={closeNewComment} list={props.selectRecipe} user={ props.user }/>
      );
    } else  if (props.user){
      return (
        <Button
          onClick={handleOpenComment}
          style={buttonStyle}
          variant="contained"
          color="primary"
        >
          Add Comment
        </Button>
      );
    } else {
      return null
    }
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#ffffff",
          display: "flex",
          flexWrap: "no-wrap",
          flexDirection: "row",
          padding: 5,
        }}
      >
        <Grid container spacing={0.5}>
          <Grid item xs={4}>
            <Item>
              <RecipeCard selectRecipe={props.selectRecipe} list={props.selectRecipe}
                ratings={props.ratings}
                user={props.user}
                setSelectRecipe={props.setSelectRecipe}
                users={props.ratings.users}
              />
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <IngredientTable list={props.selectRecipe} />
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <NutriContent list={props.selectRecipe} />
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              {renderNewComment()}
              <Modal open={openAddComment}>
                <AddComment fetchComments={props.fetchComments} hideComment={handleCloseComment} list={props.selectRecipe} user={ props.user }/>
            </Modal> 
            </Item>
            <Item>
              <RecipeSteps list={props.selectRecipe} />
            </Item>
          </Grid>          
          <Grid xs={6}>
            
            <Item>
            <DisplayComments
              hideComments={closeComments}
              comments={props.comments}
              list={props.selectRecipe}
              />
            </Item>
          </Grid>
          <Grid item xs={4}>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
