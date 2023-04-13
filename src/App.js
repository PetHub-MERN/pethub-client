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
import PetListPage from './pages/PetListPage';
import PetDetailsPage from './pages/PetDetailsPage';

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
            <Route path='/pets' element={ <PetListPage /> } />
            <Route path='/pets/:petId' element={ <PetDetailsPage /> } />
            <Route path='*' element={<NoPageFound />}/>
          </Routes>
        </Box>
        

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
