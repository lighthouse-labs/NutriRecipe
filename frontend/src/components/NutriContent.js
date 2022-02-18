import  React, {useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import DoughnutChart from '../charts/Doughnut';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];



export default function NutriContent(props) {

  const [nutritionContent, setNutritionContent] = useState([]);
  const [graphData, setGraphData] = useState([])
  const rows = eval(props.list.ingredients);


  const ingredients1 = rows.map(ingredient => {
    return `${ingredient.quantity} ${ingredient.unit} ${ingredient.name} `
  });

  

  const nutriInfo = (ingredients) => {
    console.log("Ingredients: " +  ingredients)
    if (ingredients !== null) {
      axios.get(`https://api.calorieninjas.com/v1/nutrition?query=${ingredients}`, {
        headers: {
          'X-Api-Key': 'yFhkwaiAwI1NnhFNsRWEMA==5Adx9bOrBA17c3Jj',
        },
        contentType: 'application/json'
      }).then((resp) => {  
        // const convertedResponse = resp.data.items.map(item => {
          // 
          // 
        // })
        setNutritionContent(resp.data.items)
        console.log(resp.data.items);
        generateGraphData(resp.data.items)
        
        
        
      })
    }
  }

  const generateGraphData = (information) => {
    let carb = 0;
    let fat = 0;
    let fiber = 0;
    let sugar = 0;
    let protein = 0;

    information.forEach(element => {
      carb += element.carbohydrates_total_g;
      fat += element.fat_total_g;
      fiber += element.fiber_g;
      sugar += element.sugar_g
      protein += element.protein_g;
      console.log(element.fat_total_g);

    });

    const arrayOfData = [carb, protein, sugar, fat, fiber]

    const roundedData = arrayOfData.map(data => {

      return Math.round(data * 100) / 100

    })

    setGraphData(roundedData);

    
  }

  useEffect(() => {

    nutriInfo(ingredients1)
    

  }, [])

  
  
  
  return (
    <>
      
      <DoughnutChart data={graphData}/>
    </>
  );
}
