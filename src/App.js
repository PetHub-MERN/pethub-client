import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NoPageFound from './pages/NoPageFound';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Footer from './components/Footer';
import UserProfilePage from './pages/UserProfilePage';
import ResourcePage from './pages/ResourcePage';
import VerifyAuthentication from './components/VerifyAuthentication';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignupForm';
import CreatePet from './components/CreatePet';
import CreateAdoption from './components/CreateAdoption';
import EditAdoption from './components/EditAdoption';
import EditPet from './components/EditPet';
import socketIO from 'socket.io-client';
import ChatHome from './pages/ChatHome';
import ChatPage from './pages/ChatPage';
import { useState } from 'react';

const socket = socketIO.connect(process.env.REACT_APP_API_URL);

function App() {
  
  const [toggleDark, setToggleDark] = useState(false);

  const theme = createTheme({
    palette: {
      mode: toggleDark ? 'dark' : 'light', 
      primary:{
        // main: "#D58936",
        main: "#E1AA7D",
      }, 
      welcomeLight: {
        main: "rgba(0, 0, 0, 0.7)"
      },
      welcomeDark: {
        main: "rgba(255, 255, 255, 0.7)"
      },
    }
  });

  const changeMode = () => {
    setToggleDark(!toggleDark);
  }

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
      <Box className="App">
        <Box sx={{
          minHeight: "90vh"
          
        }}>
          <Navbar toggleDark={toggleDark} changeMode={() => changeMode()} />

          <Routes>
            
            <Route path='/' element={<HomePage toggleDark={toggleDark} />}/>
            
            {/* Authentication Routes */}
            <Route path='/signup' element={<VerifyAuthentication logout> <SignUpForm isDedicatedPage/> </VerifyAuthentication>}/>
            <Route path='/login' element={<VerifyAuthentication logout> <LoginForm isDedicatedPage/> </VerifyAuthentication>}/>

            {/* Pet Routes */}
            <Route path='/pets' element={ <ResourcePage page="pets-list" /> } />
            <Route path='/pets/:petId' element={<VerifyAuthentication login> <ResourcePage page="pet-details" /> </VerifyAuthentication> } />
            <Route path='/register-pet' element={<VerifyAuthentication login> <CreatePet isDedicatedPage/> </VerifyAuthentication> } />
            <Route path='/edit-pet/:petId' element={<VerifyAuthentication login> <EditPet isDedicatedPage/> </VerifyAuthentication> } />

            
            {/* Adoption Routes */}
            <Route path='/adoptions' element={ <ResourcePage page="adoptions-list" /> } />
            <Route path='/adoptions/:adoptionId' element={<VerifyAuthentication login> <ResourcePage page="adoption-details" /> </VerifyAuthentication> } />
            <Route path='/register-adoption' element={<VerifyAuthentication login> <CreateAdoption isDedicatedPage/> </VerifyAuthentication> } />
            <Route path='/edit-adoption/:adoptionId' element={<VerifyAuthentication login> <EditAdoption isDedicatedPage/> </VerifyAuthentication> } />

            {/* Chat Routes */}
            <Route path='/chat' element={<VerifyAuthentication login> <ChatHome socket={socket} /> </VerifyAuthentication> } />
            <Route path='/chat/chat-page' element={<VerifyAuthentication login> <ChatPage socket={socket} /> </VerifyAuthentication> } />

            {/*  */}
            <Route path='/user-profile' element={<VerifyAuthentication login> <UserProfilePage /> </VerifyAuthentication> } />

            {/* Fallback Route */}
            <Route path='*' element={<NoPageFound />}/>

          </Routes>
        </Box>
        

        <Footer toggleDark={toggleDark} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
