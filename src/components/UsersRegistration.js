const BASE_URL ='http://fitnesstrac-kr.herokuapp.com/api'

import { useState } from "react"
import { useNavigate } from "react-router-dom"
// import { useNavigate } from "react-router-dom"

const UsersRegistration = () => {
    const [ username, setUsername ] = useState(" ");
    const [ password, setPassword ] = useState(" ");

    const navigate = useNavigate();

    async function accountRegistration(e) {
        e.preventDefault();
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
            console.log("registration is working")

            const resultData = await response.json();

            console.log(resultData)

            if (!resultData.token) {
                alert("Unable to create account, please try again")
            } else {
                const myJWT = resultData.token;
                localStorage.setItem("token", myJWT) 
                
                navigate("/routines")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section className="registerSection"> 
            <h3 id="registerHeader"> Create New Account </h3>
            
            <form className="registrationForm" onSubmit={accountRegistration}> 
                <input className ="usernameBox"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
                <input className = "passwordBox"
                    type="text"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <button id="submitButtong" type="submit"> Create Account </button>
            </form>
        </section>
    )
}

export default UsersRegistration 