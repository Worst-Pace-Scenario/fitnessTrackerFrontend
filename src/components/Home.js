import "./home.css"

const Home = (props) => {
    const {currentUser} = props


    console.log(currentUser)
    return(
    <div id="homeContainer">
        <div id="textContainer">
        <h1>      Worst Pace Scenario</h1>
        <h2>Here you can achieve all your fitness goals</h2>
        {
        currentUser ? 
            <h3>Welcome {currentUser.username}!</h3> : 
            <h3>Login or Register to create your own routines and activites</h3>
        }
        </div>
    </div>)
}

export default Home;