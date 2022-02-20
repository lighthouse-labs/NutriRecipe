import React,{useState, useEffect} from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { MenuItem } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import UploadImage from "./UploadImage";
import TextEditor from './TextEditor'
import IngredientList from "./IngredientList"
import Paper from '@mui/material/Paper';


const styles = {
  paperContainer: {
      height: '100%',
      backgroundImage: `url(${"https://res.cloudinary.com/de6puygvt/image/upload/v1645342161/recipes/wood-table-top-blur-kitchen-counter-room-background_254791-1293_zrvkre.jpg"})`
  }
};

const Form = (props) => {

  const [recipe, setRecipe] = useState(props.recipe ? props.recipe : {});
  const categories=[].concat(props.cates);
  const [ingredients, setIngredients] = useState(props.recipe ? props.recipe.ingredients : [{name:"",unit:"",quantity:0}]);
  const [imageSelected, setImageSelected]= useState(props.recipe ? props.recipe.image_url : null);

  if (props.selectRecipe) {
    setIngredients(props.selectRecipe.ingredients);
    setImageSelected(props.selectRecipe.image_url);
    setSteps(props.selectRecipe.steps)
    recipeName = props.selectRecipe.name;
    recipeDescription = props.selectRecipe.description;
    recipeEstimatedTime = props.selectRecipe.estimated_time;
    recipeServingSize = props.selectRecipe.serving_size;
    recipeCategoryId = props.selectRecipe.category_id;
    recipeImageUrl = props.selectRecipe.image_url;
  }

  // const setSteps=(steps)=>{
  //   setSelectRecipe({...selectRecipe,steps})
  // }

  const addIngredient=()=>{
    setIngredients([...ingredients,{name:"",unit:"",quantity:0}]);
  };

  const deleteIngredient=(i)=>{
    let newIngredients = [...ingredients];
    newIngredients.splice(i,1);
    setIngredients(newIngredients);
  }
  let handleIngredients = (event, i) => {
    let newIngredients = [...ingredients];
    let newIngredient = {...newIngredients[i],[event.target.name]:event.target.value};
    console.log('check status')
    newIngredients[i] = newIngredient;
    setIngredients(newIngredients);  
    let newRecipe = {...recipe,ingredients};
    console.log('new ingredients',newRecipe);
    setRecipe(newRecipe)
    let json_ingredients = JSON.stringify(recipe.ingredients);
  }

  const handleChange = (event) => {
    let newRecipe = {...recipe,[event.target.name]:event.target.value};
    setRecipe(newRecipe);
    console.log(recipe);
  }  

  useEffect(()=>{
    let newRecipe = props.recipe;
    setRecipe(newRecipe);
  },[]);

  return (
    <Paper className="NewRecipe"style={styles.paperContainer}>
      <Typography sx={{ fontSize: 20 }}fontWeight="bold"align="center">{props.recipe ? "EDIT RECIPE" : "ADD A NEW RECIPE"}</Typography>
      <Accordion >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{ fontSize: 20 }}>General Information*</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '103ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField required name="name" label='Recipe name' variant="outlined" onChange={handleChange} defaultValue={props.recipe ? props.recipe.name : null}/>
     
          </Box>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '103ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField required name="description" label="Recipe Description" variant="outlined" onChange={handleChange} defaultValue={props.recipe ? props.recipe.description : null}/>
          </Box>
          <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '30ch' },
              }}
              noValidate
              autoComplete="off"
            >
        <div> 
          <TextField
            required
            name="estimated_time"
            label="Time estimated (mins)"
            onChange={handleChange}
            defaultValue={props.recipe ? props.recipe.estimated_time : null}
          />
          <TextField
            required
            name="serving_size"
            label="Serving size (people)"
            onChange={handleChange}
            defaultValue={props.recipe ? props.recipe.serving_size : null}
          />
          <FormControl required variant="standard" sx={{ m: 1, minWidth: 350 }}>
            <InputLabel sx={{ fontSize: 18 }}>Category</InputLabel>
            <Select
              required
              name="category_id"
              value={recipe ? recipe.category_id : null}
              onChange={handleChange}
              label="Set a Category"
            >
              {categories.map(category =>
                <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
              )}
             
            </Select>
          </FormControl>
        </div>
      </Box>
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography sx={{ fontSize: 20 }}>Ingredient List*</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <IngredientList 
              //recipe = {recipe}
              ingredients = {ingredients}
              addIngredient={addIngredient}
              deleteIngredient={deleteIngredient}
              handleChange={handleIngredients}
              defaultValue={props.recipe ? props.recipe.ingredients : [{name:"",unit:"",quantity:0}]}
            />
          </Typography>
        </AccordionDetails>
      </Accordion>
      
      <Accordion >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography sx={{ fontSize: 20 }}>Steps to Make*</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <TextEditor
              multilines
              lines={1000}
              variant="standard"
              setSteps={setSteps}
              steps={props.recipe ? props.recipe.steps : null}
              name="steps"
              id=""
            />
          </Box>
          {/* <Box>
            <label id="lblSteps">test</label>
            <button onclick="myGeeks()">
                Click Here!
            </button>
            <script>
                {function myGeeks() {
                var x = document.getElementById("lblSteps");
                    x.innerHTML = recipe ? recipe.steps : props.recipe.steps;
                }}
            </script>
          </Box> */}
        </AccordionDetails>
      </Accordion>

      { (recipe && recipe.image_url) &&
      <Accordion expanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography sx={{ fontSize: 20 }}>Current Image</Typography>
        </AccordionSummary>
        <AccordionDetails >
          <Box > 
            <img src={recipe.image_url} alt="" width={500} height={300} mode='fit'/>
          </Box>
        </AccordionDetails>
      </Accordion>
      }
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
          {(!recipe || !recipe.image_url) &&
          <Typography sx={{ fontSize: 20 }}>Upload an Image*</Typography>
          }
          { (recipe && recipe.image_url) &&
          <Typography sx={{ fontSize: 20 }}>Replace the Current Image*</Typography>
          }
            </AccordionSummary>
          <AccordionDetails>
            <UploadImage 
              selectRecipe={selectRecipe}
              imageSelected={imageSelected}
              setImageSelected={setImageSelected}
              setRecipe={setRecipe}
            />
          </AccordionDetails>
          </Accordion>
    

      <Box display="flex" flex-direction="row" justifyContent="center" paddingTop={5}>
        <Stack direction="row" spacing={10} >
          <Button variant="contained" onClick={()=>props.onSave(recipe)}>Save your Recipe</Button>
          <Button variant="contained"onClick={props.onCancel}color="secondary">Cancel</Button>
        </Stack>
      </Box>

    </Paper>
  );
}
export default Form
