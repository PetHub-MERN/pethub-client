import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function VerifyAuthentication(props) {
    
    const { user } = useContext(AuthContext);

    if(user) {

        if(props.login) {
            return props.children;
        }

        if(props.logout) {
            return <Navigate to={"/"} />;
        }

    } else {

        if(props.login) {
            return <Navigate to={"/login"} />;
        }

        if(props.logout) {
            return props.children;
        }

    }
}

export default VerifyAuthentication;