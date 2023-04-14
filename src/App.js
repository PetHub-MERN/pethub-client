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
import AdoptionListPage from './pages/AdoptionListPage';
import AdoptionDetailsPage from './pages/AdoptionDetailsPage';
import RegisterPetPage from './pages/RegisterPetPage';
import PetEditPage from './pages/PetEditPage';
import UserProfilePage from './pages/UserProfilePage';

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
            <Route path='/pets/edit/:petId' element={ <PetEditPage /> } />
            
            {/* Adoption Routes */}
            <Route path='/adoptions' element={ <AdoptionListPage /> } />
            <Route path='/adoptions/:adoptionId' element={ <AdoptionDetailsPage /> } />
            <Route path='/edit-adoption/:adoptionId' element={ <PetListPage /> } />

            {/*  */}
            <Route path='/user-profile' element={ <UserProfilePage /> } />

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
