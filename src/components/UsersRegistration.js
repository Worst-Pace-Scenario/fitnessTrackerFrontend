const BASE_URL ='https://worstpacescenario.onrender.com/api'

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./UsersRegistration.css"

const UsersRegistration = (props) => {
    const [ username, setUsername ] = useState(" ");
    const [ password, setPassword ] = useState(" ");

    const {setCurrentUser} = props;

    const navigate = useNavigate();

    async function accountRegistration() {
        try { 

            if ( username.length < 9 ) {
                alert("Username does not meet requirement, please try again");
                return;
            } else if ( password.length < 9 ) {
                alert("Password does not meet requirements, please try again")
              return;
            }

            const response = await fetch(`${BASE_URL}/users/register`, {
                method: "POST", 
                headers: {
                    'Content-Type': "application/json",
                },

                body: JSON.stringify ({
                        username: username,
                        password: password,
                })
            })

            const resultData = await response.json();

            console.log(resultData)

            if (!resultData.token) {
                alert("Unable to create account, please try again")
            } else {
                const myJWT = resultData.token;
                localStorage.setItem("token", myJWT) 
                setCurrentUser({username, password})
                navigate("/")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section id="registerSection"> 
            <h3 id="registerHeader"> Create New Account </h3>
            
            <form className="registrationForm" onSubmit={(event) => {
                    event.preventDefault()
                    accountRegistration()}}> 
                <input className = "registrationBox"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
                <input className = "registrationBox"
                    type="text"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <button id="submitButton" type="submit"> Create Account </button>
            </form>
        </section>
    )
}

export default UsersRegistration 