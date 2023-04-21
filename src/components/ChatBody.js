import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ChatBody = ({ messages, lastMessageRef, socket }) => {
    const navigate = useNavigate();

    const handleLeaveChat = () => {
        localStorage.removeItem('userName');
        navigate('/');
        socket.disconnect();
    };

    return (
        <Container sx={{
            width: '90vw',
            height: '68vh',
            backgroundColor: '#e5b886', 
            borderTopRightRadius: '15px', 
            boxShadow: 3, 
            borderTopLeftRadius: {xs: '15px', md: '0'}
            }}
        >
            <Box sx={{
                display:'flex',
                justifyContent: 'space-between',
                height: '8vh', 
                alignItems: 'center', 
                backgroundColor: '#e5b886', 
                borderBottom: '2px solid #6A441B',
                width: "100%", 
                borderTopRightRadius: '15px', 
            }}
            >
                <Typography sx={{fontSize: {xs: '1rem'}}} variant="h6">Chat with other pet lovers!</Typography>
                <Button variant="contained" color="error" onClick={handleLeaveChat}>
                    LEAVE CHAT
                </Button>
            </Box>

            <Box sx={{overflow: 'auto', height:'58vh'}}>
                {messages.map((message) =>
                    message.name === localStorage.getItem('userName') ? (
                        <Container sx={{
                            display: 'flex', 
                            justifyContent: 'flex-end', 
                            width: '90%',
                            m: 2
                        }}
                        key={message.id}
                        >
                            <Paper sx={{
                                maxWidth: {xs: "80%", xl:'40%'},
                                padding: '15px',
                                backgroundColor: '#1284FF',
                                color: 'white'
                            }} 
                            
                            >
                                <Box>
                                    <Typography align="right" sx={{wordBreak:'break-word'}} variant="body1">{message.text}</Typography>
                                </Box>
                                <Typography sx={{color: 'black'}} variant="subtitle2" align="right" className="sender__name">You</Typography>
                            </Paper>
                        </Container>
                    ) : (
                        <Container sx={{
                            display: 'flex', 
                            justifyContent: 'flex-start', 
                            width: '90%',
                            m: 2
                        }}
                        key={message.id}
                        >
                            <Paper sx={{
                                maxWidth: {xs: "80%", xl:'40%'},
                                padding: '15px',
                                backgroundColor: '#FFF',
                                color: 'black'
                            }} 
                            
                            >
                                <Box>
                                    <Typography align="left" sx={{wordBreak:'break-word'}} variant="body1">{message.text}</Typography>
                                </Box>
                                <Typography variant="subtitle2" align="left" className="sender__name">{message.name}</Typography>
                            </Paper>
                        </Container>
                    )
                )}

                <div ref={lastMessageRef} />
            </Box>
        </Container>
    );
};

export default ChatBody;