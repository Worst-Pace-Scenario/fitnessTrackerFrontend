import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

const MySingleRoutine = (props) => {
    const [updateForm, setUpdateForm] = useState(false)
    const [activityForm, setActivityForm] = useState(false);
    const [Name, setName] = useState("");
    const [Goal, setGoal] = useState("");
    const [activityId, setactivityId] = useState("");
    const [count, setCount] = useState("");
    const [duration, setDuration] = useState("");

    const { id } = useParams()

    const navigate = useNavigate()

    let filteredRoutine = props.routines.filter((SingleRoutine) => {
        return SingleRoutine.id == id
    })

    function toggleNewFormUpdate() {
        setUpdateForm(!updateForm)
    }
    function toggleNewActivityForm() {
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
    async function updateSpecificPost(event) {
        event.preventDefault()
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
    //This function is adding an activity to the routine
    async function addActivity(event) {
        event.preventDefault()
    try {
      const response = await fetch(`https://fitnesstrac-kr.herokuapp.com/routines/${id}/activities`, {
        method: "POST",
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          activityId: activityId,
          count: count ,
          duration: duration
        })
      });
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
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
            >Delete Routine</button>

            <button onClick={toggleNewFormUpdate}>Update Routine</button>

            
                
            {
                updateForm ? (
                    <div>
                    <form onSubmit={updateSpecificPost}>
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
                </form>
                <button type="submit">Update Post</button>
                </div>
                ) : ""
            }
            <button onClick={toggleNewActivityForm}>Add Activity To Routine</button>
                {
                    activityForm ? (
                        <div>
                            <form onSubmit={addActivity}>
                                <select placeholder="Select Activity">
                            <option>{props.activities.name}</option>
                            <option>{props.activities.name}</option>
                            <option>{props.activities.name}</option>
                            <option>{props.activities.name}</option>
                            </select>
                            <input type="text" 
                            placeholder="Count" 
                            value={count}
                            on/>
                            <input type="text" placeholder="Duration"/>
                            <button type="submit">Add Activity</button>
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