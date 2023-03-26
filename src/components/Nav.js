import { Link } from "react-router-dom";
import "./nav.css"

const Nav = (props) =>{
    const {currentUser, setCurrentUser} = props;

    function logout (){
        localStorage.removeItem("token");
        setCurrentUser({});
    }


    return (
    <nav>
        <Link to="/" id="navLogo">Worst Pace Scenario</Link>
        {
            currentUser ? 
            <div id="navButtons">
                <Link to="/activities" >Activities</Link>
                <Link to="/routines" >Routines</Link>
                <Link to="/myroutines">My Routines</Link>
                <Link to="/" onClick={logout}>Logout</Link>
            </div> : 
            <div id="navButtons">
                <Link to="/activities">Activities</Link>
                <Link to="routines">Routines</Link>
                <Link to="/login">Login</Link>
                <Link to="register">Register</Link>
            </div>
        }
    </nav>
    )
    
}

export default Nav;