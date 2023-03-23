import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "./myroutines.css"

const MyRoutines = (props) => {
    const [newPostForm, setNewPostForm] = useState(false);
    const [updateForm, setUpdateForm] = useState(false)
    const [Name, setName] = useState("");
    const [Goal, setGoal] = useState("");
    const [isPublic, setIsPublic] = useState(false)
    const [newName, setNewName] = useState("");
    const [newGoal, setNewGoal] = useState("")

    const { id } = useParams()

    const navigate = useNavigate()



    //This function is toggling the newPostRequest form...
    function toggleNewForm() {
        setNewPostForm(!newPostForm)
    }
    function toggleNewFormUpdate() {
        setUpdateForm(!updateForm)
    }

    //This function is fetching all the routines
    async function fetchRoutines() {
        try {
            const response = await fetch(`https://fitnesstrac-kr.herokuapp.com/routines`, {
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const result = await response.json()


        } catch (error) {
            console.log(error)
        }
    }


    //This function is creating a post request via the api that was given to us...
    async function newPostRequest (event) {
        event.preventDefault();
        try {
            const response = await fetch(`https://fitnesstrac-kr.herokuapp.com/routines`, {
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

        } catch(error) {
            console.log(error)
        }
    }

    //This is the function for deleting a post request via the api that was given to us...
    //This function is missing the useParams id to identify the post we want to delete
    async function deleteSpecificPost(event) {
        event.preventDefault();
        try {
            const response = await fetch(`https://fitnesstrac-kr.herokuapp.com/routines/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
            });
            const result = await response.json()
            // Need to filter through the array to find the id of goal deleted

            navigate("/routines")


        } catch(error) {
            console.log(error)
        }
    }

    //This function is updating the post via the api that was given to  us...
    async function updateSpecificPost() {
        try {
            const response = await fetch (`https://fitnesstrac-kr.herokuapp.com/routines/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    name: Name,
                    goal: Goal
                })
            });
            const result = await response.json()
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <div>

            <div>
                <button id="button" onClick={toggleNewForm}>Create Routine</button>
            </div>

            {
            newPostForm ? (
                <div>
            <form onSubmit={newPostRequest}>
                <input
                type="text"
                placeholder="Name of Goal"
                value={Name}
                onChange={(event) => setName(event.target.value)}
                />
                <textarea
                type="text"
                rows="3"
                cols="100"
                placeholder="Goal Description"
                value={Goal}
                onChange={(event) => setGoal(event.target.value)}
                />
                <input
                id="checkbox"
                type="checkbox"
                placeholder="Make Goal Public"
                value={isPublic}
                onChange={(event) => setIsPublic(!isPublic)}
                />
                <label
                htmlFor="checkbox"
                > Make Routine Public? 
                </label>
            </form>
            <button onClick={newPostRequest}>Submit</button>
            </div>
                ) : ""
            }
            <button 
            id="button"
            onClick={deleteSpecificPost}
            >Delete Post</button>

            <button onClick={toggleNewFormUpdate}>Update Routine</button>

            
                
            {
                updateForm ? (
                    <div>
                    <form onSubmit={updateSpecificPost}>
                    <input
                    type="text"
                    placeholder="Name of Goal"
                    value={newName}
                    onChange={(event) => setNewName(event.target.value)}
                    />
                    <textarea
                    type="text"
                    rows="3"
                    cols="100"
                    placeholder="Goal Description"
                    value={newGoal}
                    onChange={(event) => setNewGoal(event.target.value)}
                    />
                </form>
                <button onClick={updateSpecificPost}>Update Post</button>
                </div>
                ) : ""
            }

            {/* <button>Add Activity To Routine</button>
            <form>
                <option value={props.activity.name}>{props.activity.name}</option>
                <option value={props.activity.name}>{props.activity.name}</option>
                <option value={props.activity.name}>{props.activity.name}</option>
                <option value={props.activity.name}>{props.activity.name}</option>
            </form> */}
            
                



        </div>
    )
}

export default MyRoutines