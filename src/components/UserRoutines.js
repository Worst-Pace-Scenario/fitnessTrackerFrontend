import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./UserRoutines.css"

const BASE_URL = 'https://worstpacescenario.onrender.com/api/' 

const UserRoutines = (props) => {
    const { currentUser, routines, fetchRoutines } = props 
    const [ myRoutines, setMyRoutines ] = useState ([])
    const [ newPostForm, setNewPostForm ] =useState(false)
    const [ Name, setName ] = useState("")
    const [ Goal, setGoal ] = useState("")
    const [ isPublic, setIsPublic ] = useState(false)

    //This function is toggling the newPostRequest form...
    function toggleNewForm() {
        setNewPostForm(!newPostForm)
    }


    const fetchMyData = async (event) => {

        try {
            const response = await fetch(`${BASE_URL}users/${currentUser.username}/routines`,{
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            })
            const result = await response.json()
            console.log(result)

          
            setMyRoutines(result) // result or myRoutinesData
        } catch (error) {
            console.log(error)
        }
    }
    console.log(Name, Goal)
    console.log(localStorage.getItem("token"))

    async function newPostRequest() {
        try {
            const response = await fetch(`${BASE_URL}routines`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    name: Name,
                    goal: Goal,
                    isPublic: isPublic
                })
            });
            const result = await response.json()
            console.log(result)

            result[0].activities = "No activities yet"


            if(result.error) {
                alert(result.error)
            }else {
                fetchRoutines()
                setMyRoutines([...myRoutines, result[0]])
            }
            console.log(result)
            
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchMyData();
    }, [currentUser])

    console.log(myRoutines)

    
    return (
        <section> 
            <h3 id="header"> Here are all your routines </h3> 

            <div>
                <button id="createroutinebutton" onClick={toggleNewForm}>Create Routine</button>
            </div>
            {
            newPostForm ? (
                <div>
            <form id="createroutineform" onSubmit={(event) => {
                event.preventDefault()
                newPostRequest()}}>
                <input
                type="text"
                placeholder="Name of Goal"
                value={Name}
                onChange={(event) => {setName(event.target.value)}}
                />
                <textarea
                type="text"
                rows="3"
                cols="100"
                placeholder="Goal Description"
                value={Goal}
                onChange={(event) => {setGoal(event.target.value)}}
                />
                <input
                id="checkbox"
                type="checkbox"
                placeholder="Make Goal Public"
                value={isPublic}
                onChange={(event) => {setIsPublic(!isPublic)}}
                />
                <label
                htmlFor="checkbox"
                > Make Routine Public?
                </label>
                <button id="submit" type="submit">Submit</button>
            </form>
            
            </div>
                ) : ""
            }
            <h1 id="userroutineheader"> {currentUser.username} Routines </h1>
            
            { 
                // if (myRoutines.creatorName == {currentUser.username} )
                myRoutines.length > 0 ? (myRoutines.map((singleRoutinesElement) => {
                   return (
                        <div id="myroutines" key={singleRoutinesElement.id}> 
                            
                            <h2 id="link"> <Link to={`/routines/${singleRoutinesElement.id}`}>Name of Goal:{singleRoutinesElement.name}</Link></h2>
                            <h4>Goal Description:{singleRoutinesElement.goal}</h4>
                        </div>
                   )
                })
                ) : ( <div> No data available </div> 
                )}
        </section>
    )
}


export default UserRoutines

