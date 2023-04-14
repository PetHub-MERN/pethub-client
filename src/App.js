import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NoPageFound from './pages/NoPageFound';
import { Box, ThemeProvider, createTheme } from '@mui/material';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Footer from './components/Footer';
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
            {/* Authentication Routes */}
            <Route path='/' element={<HomePage />}/>
            <Route path='/signup' element={<SignUpPage />}/>
            <Route path='/login' element={<LoginPage />}/>

            {/* Pet Routes */}
            <Route path='/pets' element={ <PetListPage /> } />
            <Route path='/pets/:petId' element={ <PetDetailsPage /> } />
            <Route path='/register-pet' element={ <PetDetailsPage /> } />
            <Route path='/edit-pet/:petId' element={ <PetDetailsPage /> } />
            
            {/* Adoption Routes */}
            <Route path='/adoptions' element={ <PetListPage /> } />
            <Route path='/adoptions/:adoptionId' element={ <PetDetailsPage /> } />
            <Route path='/register-adoption' element={ <PetDetailsPage /> } />
            <Route path='/edit-adoption/:adoptionId' element={ <PetDetailsPage /> } />

            {/*  */}
            <Route path='/user-profile' element={ <PetDetailsPage /> } />

            {/* Fallback Route */}
            <Route path='*' element={<NoPageFound />}/>

          </Routes>
        </Box>
        

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
