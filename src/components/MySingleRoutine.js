import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

const MySingleRoutine = (props) => {
    const [updateForm, setUpdateForm] = useState(false)
    const [activityForm, setActivityForm] = useState(false);

    const { id } = useParams()

    const nvaigate = useNavigate()

    let filteredRoutine = props.routines.filter((SingleRoutine) => {
        return SingleRoutine.id == id
    })

    function toggleNewFormUpdate() {
        setUpdateForm(!updateForm)
    }
    function toggleActivityForm() {
        setActivityForm(!activityForm)
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
            
            let filteredRoutineArrayDelete = props.routines.filter((singleRoutine) => {
                if(singleRoutine.id != id) {
                    return singleRoutine
                }
            })
            setRoutines(filteredRoutineArrayDelete)

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
            setRoutines(result)
        } catch (error) {
            console.log(error)
        }
    }

  return(
    <div>
        {/* {
        singleRoutine ? ( */}
            <div>
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
                <button type="submit">Update Post</button>
                </div>
                ) : ""
            }
            <button onClick={toggleActivityForm}>Add Activity To Routine</button>
                {
                    toggleActivityForm ? (
                        <div>
                            <form>
                            <option value={props.activities.name}>{props.activities.name}</option>
                            <option value={props.activities.name}>{props.activities.name}</option>
                            <option value={props.activities.name}>{props.activities.name}</option>
                            <option value={props.activities.name}>{props.activities.name}</option>
                            <input type="text" placeholder="Count"/>
                            <input type="text" placeholder="Duration"/>
                            <button type="submit"></button>
                            </form>
                            
                        </div>
                    ): ""
                }
            </div>
        {/* ) : ""
        } */}


        </div>
  )



}

export default MySingleRoutine;