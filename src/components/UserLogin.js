const BASE_URL ='http://fitnesstrac-kr.herokuapp.com/api'

import { useState } from "react"
import { useNavigate } from "react-router-dom";
const UserLogin = (props) => {
    
    const [ myUsername, setMyUsername ] = useState("");
    const [ myPassword, setMyPassword ] = useState("")

    const {setCurrentUser} = props;

    const navigate = useNavigate(); 

    async function loginFunction(e) {
        e.preventDefault();

        try {
            const response = await fetch (`${BASE_URL}/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify ({
                    username: myUsername,
                    password: myPassword 
                })
            })
            console.log("login is working")

            const result = await response.json();
            console.log(result)

            if (!result.token) {
                alert("Username or password is incorrect, please try again")
            } else {
                const myJWT = result.token;

                localStorage.setItem("token", myJWT)

                setCurrentUser(result.user)

                navigate("/routines")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section id="loginSection">
            <h3 id="loginHeader"> Login to your account</h3>

            <form onSubmit={loginFunction}>
                <input className="loginBox"
                    type="text"
                    placeholder="Username"
                    value={myUsername}
                    onChange={(event) => setMyUsername(event.target.value)}
                />
                <input className="loginBox"
                    type="text"
                    placeholder="Password"
                    value={myPassword}
                    onChange={(event) => setMyPassword(event.target.value)}
                />
                <button className="loginButton" type="submit"> Login </button>
            </form>
        </section>
    )

}

export default UserLogin