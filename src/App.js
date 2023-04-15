import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NoPageFound from './pages/NoPageFound';
import { Box, ThemeProvider, createTheme } from '@mui/material';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Footer from './components/Footer';
import UserProfilePage from './pages/UserProfilePage';
import ResourcePage from './pages/ResourcePage';

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
            <Route path='/pets' element={ <ResourcePage page="pets-list" /> } />
            <Route path='/pets/:petId' element={ <ResourcePage page="pet-details" /> } />
            
            {/* Adoption Routes */}
            <Route path='/adoptions' element={ <ResourcePage page="adoptions-list" /> } />
            <Route path='/adoptions/:adoptionId' element={ <ResourcePage page="adoption-details" /> } />

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
