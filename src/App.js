// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, CssBaseline, IconButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import PostList from './components/PostList';
import './index.css'; // Ensure you import your custom styles

const App = () => {
  const [darkMode, setDarkMode] = useState(false);// state which defines whether it's dark mode or not 

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  
  const handleThemeChange = () => {// function to switch between light and dark mode
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              GoBananas
            </Typography>
            <IconButton edge="end" color="inherit" onClick={handleThemeChange}>
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Container className="scrollbar mt-8">
          <Routes>
          <Route path="/" element={<PostList darkMode={darkMode} />} />

          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
