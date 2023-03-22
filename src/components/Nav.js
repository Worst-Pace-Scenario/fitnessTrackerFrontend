import { Link } from "react-router-dom";

const Nav = (props) =>{
    const {currentUser, setCurrentUser} = props;

    function logout (){
        localStorage.removeItem("token");
        setCurrentUser({});
    }


    return (
    <nav>
        <div id="navLogo">Worst Pace Scenario</div>
        {
            currentUser ? 
            <div id="navButtons">
                <Link to="/activities" >Activities</Link>
                <Link to="/routines" >Routines</Link>
                <Link to="/myroutines">My Routines</Link>
                <Link to="/" onClick={logout}>Logout</Link>
            </div> : 
            <div id="navButtons">

            </div>
        }
    </nav>
    )
    
}

export default Nav;