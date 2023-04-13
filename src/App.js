import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NoPageFound from './pages/NoPageFound';
import { Box, ThemeProvider, createTheme } from '@mui/material';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Footer from './components/Footer';
import CreateAdoptionPage from './pages/CreateAdoptionPage';

function App() {

  const theme = createTheme({
    palette: {
      primary:{
        main: "#D58936",
      }
    }
  });


  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Box sx={{
          minHeight: "90vh"
        }}>
          <Navbar />

          <Routes>
            <Route path='/' element={<HomePage />}/>
            <Route path='/signup' element={<SignUpPage />}/>
            <Route path='/login' element={<LoginPage />}/>
            
            <Route path='*' element={<NoPageFound />}/>
          </Routes>
        </Box>
        

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
