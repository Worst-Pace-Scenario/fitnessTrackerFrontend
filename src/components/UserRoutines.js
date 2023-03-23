import { useState } from "react"

const BASE_URL ='http://fitnesstrac-kr.herokuapp.com/api/'

const UserRoutines = (props) => {

    const { currentUser } = props 

    const [ myId, setMyId ] = useState('')
    const [ myUsername, setMyUsername ] = useState ('')
    const [ myActivities, setMyActivities ] = useState('')


    useEffect(() => {

        console.log(localStorage.getItem("token"))
        if (localStorage.getItem("token")) {
            props.setIsLoggedIn(true)
            console.log("this is working")
        } else {
            props.setIsLoggedIn(false);
            console.log("no token exists")
        }
    }, []);

    const myData = async () => {

    try {  
        const response = await fetch(`${BASE_URL}/users/${currentUser}/routines`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                currentUser: {

                }

            })
        })
        const result = await response.json()
        console.log(result);
        return result
    } catch (error) {
        console.log(error)
    }
    }
    
    return (
        <p> Placeholder</p>
    )
}

export default UserRoutines
