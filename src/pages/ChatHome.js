import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

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
        socket.emit('newUser', { userNameFromAuth, socketID: socket.id });
        navigate('/chat/chat-page');
    };

    return (
        <>
            <h2>Do you want to join the chat as <strong>{user.name}?</strong></h2>
            <button onClick={(e) => {handleConfirmation(e)}}>JOIN THE CHAT</button>
        </>
    );

};

export default ChatHome;