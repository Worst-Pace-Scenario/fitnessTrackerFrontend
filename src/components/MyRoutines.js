import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

const MyRoutines = (props) => {
    const [newPostForm, setNewPostForm] = useState(false);
    const [Name, setName] = useState("");
    const [Goal, setGoal] = useState("");
    const [isPublic, setIsPublic] = useState(false)

    const navigate = useNavigate()



    //This function is toggling the newPostRequest form...
    function toggleNewForm() {
        setNewPostForm(!newPostForm)
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
            const response = await fetch(`https://fitnesstrac-kr.herokuapp.com/routines`, {
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



    return (
        <div>

            <div>
                <button onClick={toggleNewForm}>Create Goal</button>
            </div>

            {
            newPostForm ? (
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
                > Make Goal Public? 
                </label>
            </form>
                ) : ""
            }
            <button 
            onClick={deleteSpecificPost}
            >Delete Post</button>


        </div>
    )
}

export default MyRoutines