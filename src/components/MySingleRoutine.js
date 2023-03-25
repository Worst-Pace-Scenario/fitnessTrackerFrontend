import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"



const MySingleRoutine = (props) => {
    const BASE_URL = 'http://fitnesstrac-kr.herokuapp.com/api/'
    const [updateForm, setUpdateForm] = useState(false)
    const [activityForm, setActivityForm] = useState(false);
    const [updateActivity, setUpdateActivity] = useState(false)
    const [myActivities, setMyActivities] = useState([])
    const [Name, setName] = useState("");
    const [Goal, setGoal] = useState("");
    const [activityId, setactivityId] = useState("");
    const [count, setCount] = useState("");
    const [duration, setDuration] = useState("");
    const [MyRoutines, setMyRoutines] = useState([])


    const { id } = useParams()


    const navigate = useNavigate();

    function toggleNewFormUpdate() {
        setUpdateForm(!updateForm)
    }
    function toggleNewActivityForm() {
        setActivityForm(!activityForm)
    }
    function toggleUpdateActivity() {
        setUpdateActivity(!updateActivity)
    }

    let filteredRoutine = props.routines.filter((singleRoutinesElement) => {
        console.log(singleRoutinesElement)
        return (
            singleRoutinesElement.creatorId == props.currentUser.id
        )
    })
    console.log(props.currentUser)
    console.log(filteredRoutine)
    // let filteredRoutine = props.routines.filter((singleRoutinesElement) => {
    //     return singleRoutinesElement.creatorName == 
    // })

    //This is the function for deleting a post request via the api that was given to us...
    //This function is missing the useParams id to identify the post we want to delete
    async function deleteSpecificPost(event) {
        event.preventDefault();
        try {
            const response = await fetch(`${BASE_URL}/routines/${id}`, {
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
            setMyRoutines(filteredRoutineArrayDelete)

            navigate("/routines")


        } catch(error) {
            console.log(error)
        }
    }

    //This function is updating the post via the api that was given to  us...
    async function updateSpecificPost(event) {
        event.preventDefault()
        try {
            const response = await fetch (`${BASE_URL}/routines/${id}`, {
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
            setMyRoutines(result)
        } catch (error) {
            console.log(error)
        }
    }
    //This function is adding an activity to the routine
    //This is where I am adding the activity to the array in routines

    async function addActivity(event) {
        event.preventDefault()
        console.log("this is the typeof count", typeof activityId)
    try {
      const response = await fetch(`${BASE_URL}/routines/${id}/activities`, {
        method: "POST",
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          activityId: parseInt(activityId),
          count: parseInt(count),
          duration: parseInt(duration)
        })
      });

      const result = await response.json();
      setMyActivities(result)

      

      console.log(result);
      return result
    } catch (error) {
      console.error(error);
    }
  }


  console.log(filteredRoutine)

  return(
    <div>
        
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
                                    {
                                        props.activities.length ? props.activities.map(activity => {
                                            return (
                                                <option key={activity.name} value={activity.name}>{activity.name}</option>
                                            )
                                        }): <div>Data is loading...</div>

                                        
                                    }
                            </select>
                            <input type="text" 
                            placeholder="Count" 
                            value={count}
                            onChange={(event) => setCount(event.target.value)}
                            />
                            <input type="text" 
                            placeholder="Duration"
                            value={duration}
                            onChange={(event) => setDuration(event.target.value)}
                            />
                            <button type="submit">Add Activity</button>
                            </form>
                            
                        </div>
                    ): ""
                }
                {/* <button onClick={toggleUpdateActivity}>Update Routine</button>
                {
                updateActivity ? (
                <form>
                    <input type="text" placeholder="New Count"/>
                    <input type="text" placeholder="New Duration"/>
                </form>
                ): ""
                } */}

 { 
                // if (myRoutines.creatorName == {currentUser.username} )
                filteredRoutine.length > 0 ? (filteredRoutine.map((singleRoutinesElement) => {
                   return (
                        <div key={singleRoutinesElement.id}> 
                            
                            <h2>{singleRoutinesElement.name}</h2>
                            <h3>{singleRoutinesElement.activities}</h3>
                            <h4>{singleRoutinesElement.goal}</h4>
                            <h4>{singleRoutinesElement.creatorName}</h4>

                        </div>
                   )
                })
                ) : ( <div> No data available </div> 
                )} 
            </div>
        


        </div>
  )



}

export default MySingleRoutine;