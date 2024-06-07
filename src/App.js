import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, CssBaseline, IconButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import PostList from './components/PostList';
import './index.css'; // Ensure you import your custom styles

const App = () => {
  // Retrieve the dark mode state from local storage, defaulting to false if it's not set
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true' || false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const handleThemeChange = () => {
    // Toggle the dark mode state
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    // Store the new dark mode state in local storage
    localStorage.setItem('darkMode', newDarkMode);
  };

  useEffect(() => {
    // Set the theme mode when the component mounts
    document.documentElement.setAttribute('data-theme', theme.palette.mode);
  }, [theme.palette.mode]);

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
