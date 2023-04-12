import { Link } from "react-router-dom";

function NoPageFound() {
    return(
        <>
            <h1>The page you are trying to access doesn't exist.</h1>
            <Link to={"/"}><h2>Return to the Home Page</h2></Link>
        </>
    );
}

export default NoPageFound;