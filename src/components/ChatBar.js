import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const ChatBar = ({ socket }) => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        socket.on('newUserResponse', (data) => setUsers(data));
    }, [socket, users]);

    return (
        <Container sx={{
            width: '15vw',
            maxWidth: '15vw',
            height: '100%',
            justifyContent: 'flex-start',
            m: 0,
            borderRight: '2px solid #6A441B',
            backgroundColor: '#D58936',
            borderTopLeftRadius: '15px', 
            borderBottomLeftRadius: '15px', 
            boxShadow: 3,
            display: {xs: 'none', md: 'block'}
        }} 
        >
            <Typography sx={{mt:2, fontSize:'1.3rem'}} variant="h4">🐮 <strong>Pet</strong>Hub Chat 🐵</Typography>

            <div>
                <Typography sx={{fontSize:'1.1rem', mt:2}} variant='h4'>ACTIVE USERS</Typography>
                <Box sx={{mt:3}} className="chat__users">
                    {users.map((user) => (
                        <Typography variant="body1" key={user.socketID}>{user.userNameFromAuth}</Typography>
                    ))}
                </Box>
            </div>
        </Container>
    )
};

export default ChatBar;