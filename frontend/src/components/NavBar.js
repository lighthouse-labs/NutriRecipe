import React, { useState } from "react";
import axios from "axios";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link as Link1} from "react-router-dom";
import useVisualMode from './NewRecipe/hooks/useVisualMode';
import Recipe from './NewRecipe/index';
import Search from "@mui/icons-material/Search";

const ResponsiveAppBar = (props) => {
  let name = '';
  let pages = [];
  let settings = [];
  if (props.login_name !=='') {
    pages.push('My Recipes', 'Add New Recipe');
    settings.push('Logout');
    name = props.login_name
    // if (props.login_right === 1) {
    //    pages.push('Admin')
    //  }
   } else {
      settings.push('Login', 'Sign Up');
   }
  
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <Link href="/">
              <Avatar alt="NutriRecipe" src="//res.cloudinary.com/de6puygvt/image/upload/v1644038875/recipes/Nutrition-Wave-Article-Marty-Gallagher_lwzop4.jpg" />
            </Link>
            <Link href="/" color="#ffffff" underline="none">NutriRecipe</Link>
          </Typography>
          <Link href="/" color="#ffffff" underline="none">Nutrition Facts Simplified</Link>
            
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
             <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    {/*page*/}
                    {/* {page==='Add New Recipe' && <Link1  to="/newrecipe" underline="none">Add a new Recipe</Link1>} */}
                    {/* {page==='My Recipes' && <Link1 to="/myrecipes" underline="none">My Recipes</Link1>} */}
                    {page==='My Recipes' && <Button variant="contained" onClick={()=>{window.location.href="/myrecipes"}} underline="none">My Recipes</Button>}
                  
                  </Typography>

                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <Link href="/">
              <Avatar alt="NutriRecipe" src="//res.cloudinary.com/de6puygvt/image/upload/v1644038875/recipes/Nutrition-Wave-Article-Marty-Gallagher_lwzop4.jpg" />
            </Link>
              NutriRecipe
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {/*page*/}
                {/* {page==='Add New Recipe' && <Link1  to="/newrecipe">Add a new Recipe</Link1>} */}
                {/* {page==='My Recipes' && <Link1 to="/myrecipes" underline="none">My Recipes</Link1>} */}
                {page==='My Recipes' && <Button variant="contained" onClick={()=>{window.location.href="/myrecipes"}} underline="none">My Recipes</Button>}
               
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton style={{color: "#ffffff"} }onClick={handleOpenUserMenu} sx={{ p: 0 }} size={'small'}>
                { name ? name : "User?" }
                <KeyboardArrowDownIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem  key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                  {setting === 'Sign Up' && <Typography onClick={props.handleSignInOpen}>Sign Up</Typography>}
                  {setting === 'Login' && <Typography onClick={props.handleLoginOpen}>Login</Typography>}
                  {setting === 'Logout' && <Typography onClick={props.logout}>Logout</Typography>}
                  
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
