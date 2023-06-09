import { Link, useNavigate } from "react-router-dom";
import "./nav.css"

const Nav = (props) =>{
    const {currentUser, setCurrentUser} = props;


    const navigate = useNavigate();

    function logout (){
        localStorage.removeItem("token");
        setCurrentUser("");
        navigate("/")
    }


    return (
    <nav>
        <Link to="/" id="navLogo">Worst Pace Scenario</Link>
        {
            currentUser ? 
            <div id="navButtons">
                <Link to="/activities" >Activities</Link>
                <Link to="/routines" >Routines</Link>
                <Link to="/userroutines">My Routines</Link>
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