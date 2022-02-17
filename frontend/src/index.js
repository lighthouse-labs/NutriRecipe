import React from 'react';
import './index.css';
import App from './App';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Recipes from "./routes/recipes";
import Users from "./routes/users";
import NewRecipe from "./routes/newrecipe";
import MyRecipes from "./routes/myrecipes";
import Admin from "./routes/admin";


const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="users" element={<Users />} />
      <Route path="recipes" element={<Recipes />} />
      
      <Route path="newrecipe" element={<NewRecipe />} />
      <Route path="myrecipes" element={<MyRecipes/>} />
      <Route path="admin" element={<Admin />} />
      {/* {token && <Route path="secret" element={<Secret />}/>} */ }
    </Routes>
  </BrowserRouter>,
  rootElement
);
