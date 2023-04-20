import { useContext, useEffect, useRef, useState } from "react";
import ChatBar from "../components/ChatBar";
import ChatBody from "../components/ChatBody";
import ChatFooter from "../components/ChatFooter";
import { Box, Container } from "@mui/material";
import { AuthContext } from "../context/auth.context";

const ChatPage = ({ socket }) => {

    const [messages, setMessages] = useState([]);
    const [typingStatus, setTypingStatus] = useState('');
    const lastMessageRef = useRef(null);

    const { user } = useContext(AuthContext);

    const userNameFromAuth = user.name;

    useEffect(() => {
        socket.on('messageResponse', (data) => setMessages([...messages, data]));
    }, [socket, messages]);

    useEffect(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        socket.on('typingResponse', (data) => setTypingStatus(data));
        socket.on("connect", () => {
            socket.emit('newUser', { userNameFromAuth, socketID: socket.id });
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket]);

    return(
        <Container sx={{display:'flex', minWidth:"100vw", height: '75vh', m:0, mt: 3, justifyContent:'center'}}>
            <ChatBar socket={socket} />
            <Box>
                <ChatBody messages={messages} typingStatus={typingStatus} lastMessageRef={lastMessageRef} />
                <ChatFooter socket={socket} />
            </Box>
        </Container>
    )
};

export default ChatPage;