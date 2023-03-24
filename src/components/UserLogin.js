const BASE_URL ='http://fitnesstrac-kr.herokuapp.com/api/'

import { useState } from "react"

const UserLogin = () => {
    
    const [ myUsername, setMyUsername ] = useState("");
    const [ myPassword, setMyPassword ] = useState("")

    async function loginFunction() {

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

            const result = await response.json();
            console.log(result)

            if (!result.success) {
                alert("Username or password is incorrect, please try again")
            } else {
                const myJWT = result.data.token;

                localStorage.setItem("token", myJWT)
            }
        } catch {
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