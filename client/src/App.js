import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Scene/homePage'; // Adjust the path as needed
import LoginPage from './Scene/loginPage'; // Adjust the path as needed
import ProfilePage from './Scene/profilePage'; // Adjust the path as needed
import { useMemo } from "react";
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { themeSettings } from './theme';

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
