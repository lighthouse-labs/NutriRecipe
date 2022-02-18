import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '@fontsource/roboto/700.css';


export default function RecipeSteps(props) {
  // let temp_steps = props.list.steps;
  // let recipeSteps = [props.list.steps];
  // if (temp_steps.search('.') > 0 ) {
  //   recipeSteps = [].concat(props.list.steps.split('.'));
  //   recipeSteps.pop();
  // }

  const recipeSteps = props.list.steps.split('.');

  return (
    <>
      <Card elevation={10} sx={{ minWidth: 275, maxHeight :350, overflow:"auto" }}>
      <CardContent>
        <Typography variant="h5" color="text.secondary" gutterBottom = "true">
            How to make {props.list.name}       
        </Typography>
        <Typography variant="h6" color="text.secondary" component="div" paragraph="true">
          <ol style = {{textAlign:'left'}}>
              {recipeSteps.map(step=>{
                return <li>{`${step}.`}</li>
              })
              }
        </ol>
        </Typography>
       
      </CardContent>
      
    </Card>     
      {/* <Container elevation={10} style={{ height: 'auto', width: "100%", padding: 10, border: "none"}}variant="elevation" >
        <ol style = {{textAlign:'left'}}>
          <div>
          Steps:
          </div>
              {recipeSteps.map(step=>{
                return <li>{`${step}.`}</li>
              })
              }
        </ol>
      </Container> */}
    </>
      
    

    
  );
}
