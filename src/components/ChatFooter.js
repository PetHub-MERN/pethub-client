import { Button, Container, TextField } from "@mui/material";
import { useState } from "react";
import SendIcon from '@mui/icons-material/Send';

const ChatFooter = ({ socket }) => {
    const [message, setMessage] = useState('');

    const handleTyping = () =>
        socket.emit('typing', `${localStorage.getItem('userName')} is typing`);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim() && localStorage.getItem('userName')) {
            socket.emit('message', {
                text: message,
                name: localStorage.getItem('userName'),
                id: `${socket.id}${Math.random()}`,
                socketID: socket.id,
            });
        }
        setMessage('');
    };

    return (
        <Container sx={{
            width: '90vw',
            height: '7vh',
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            backgroundColor: '#f2dbc2',
            borderBottomRightRadius: '15px',
            borderTop: '2px solid #6A441B',
            borderBottomLeftRadius: {xs: '15px', md: '0'}
            }} 
        >
            <form onSubmit={handleSendMessage}>
                <TextField
                    type="text"
                    placeholder="Write a message..."
                    className="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleTyping}
                    size="small"
                    sx={{marginRight: '5px', width:{xs: '40vw', md: '30vw'}, backgroundColor: 'rgba(213,137,54,0.2)', borderRadius: '5px'}}
                />
                <Button variant="contained" endIcon={<SendIcon />} onClick={handleSendMessage}>SEND</Button>
            </form>
        </Container>
    );
};

export default ChatFooter;