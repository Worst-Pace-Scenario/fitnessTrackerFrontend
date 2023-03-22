const BASE_URL ='http://fitnesstrac-kr.herokuapp.com/api/'

import { useState } from "react"
// import { useNavigate } from "react-router-dom"

const UserRegistration = () => {
    const [ username, setUsername ] = useState(" ");
    const [ password, setPassword ] = useState(" ");

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
                header: {
                    'Content-Type': "application/json",
                },

                body: JSON.stringify ({
                    user: {
                        username: username,
                        password: password,
                    }
                })
            })

            const resultData = await response.json();

            console.log(resultData)

            if (!resultData.success) {
                alert("Unable to create account, please try again")
            } else {
                const myJWT = resultData.data.token;
                localStorage.setItem("token", myJWT) 

            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section> 
            <h3> Create New Account </h3>
            
            <form onSubmit={accountRegistration}> 
                <input 
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
                <input
                    type="text"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <button type="submit"> Create Account </button>
            </form>
        </section>
    )
}

export default UserRegistration 