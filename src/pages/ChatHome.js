import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Box, Button, Paper, Typography } from "@mui/material";

const ChatHome = ({ socket }) => {

    const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
    const [userName, setUserName] = useState('');

    const { user } = useContext(AuthContext);

    const userNameFromAuth = user.name;

    const handleConfirmation = (e) => {
        e.preventDefault();
        setUserName(user.name);
        localStorage.setItem('userName', userNameFromAuth);
        // sends the username and socket ID to the Node.js server
        socket.connect();
        socket.emit('newUser', { userNameFromAuth, socketID: socket.id });
        navigate('/chat/chat-page');
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '80vh'
        }}>
            <Paper sx={{
                p: 5
            }}>
                <Typography sx={{fontSize:{xs:'1.2rem', md: '2.5rem', xl:'3.5rem'}}} variant='h2'>Do you want to join the chat as <br /> <strong>{user.name}</strong>?</Typography>
                <Button sx={{mt:3}} variant='contained' onClick={(e) => {handleConfirmation(e)}}>JOIN THE CHAT</Button>
            </Paper>
        </Box>
    );

};

export default ChatHome;