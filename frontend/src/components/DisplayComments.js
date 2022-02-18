import React from 'react'
import OneComment from './OneComment';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';


const DisplayComments = (props) => {
 
  const buttonStyle = { margin: '10px 0 0 0' }


  const arrayOfComments = props.comments.comments.map(comment => {
    if (props.list.id === comment.recipe_id) {
      console.log(comment.recipe_id);
      return <OneComment comment={comment} users={props.comments.users} />      
    }
  })
  return (
    <Container >
      {/* <Button  onClick={props.hideComments} style={buttonStyle} variant='contained' color='primary'>Hide Comments</Button> */}
      <h1>Comments</h1>
      {arrayOfComments.reverse()}
    </Container>
    
  )
}

export default DisplayComments