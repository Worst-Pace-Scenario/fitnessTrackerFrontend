import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

import RoutineActivities from "./RoutineActivities"



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
   
    //THIS DOESNT WORK BECAUSE ALL THE ROUTINES HAVE THE SAME ID??????????????
    const {activities} = props;
    const {routines} = props;

    const selectedRoutine = routines.filter((routine) => {
        return (routine.id == id);
    })[0] 

   const [thisRoutine, setThisRoutine] = useState(selectedRoutine)
   const [theseActivities, setTheseActivities] = useState(selectedRoutine.activities)

   console.log(theseActivities)


   console.log(thisRoutine)

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
        return (
            singleRoutinesElement.creatorId == props.currentUser.id
        )
    })
    // console.log(filteredRoutine)
    // let filteredRoutine = props.routines.filter((singleRoutinesElement) => {
    //     return singleRoutinesElement.creatorName == 
    // })

    //This is the function for deleting a post request via the api that was given to us...
    //This function is missing the useParams id to identify the post we want to delete
    async function deleteSpecificPost(event) {
        event.preventDefault();
        try {
            const response = await fetch(`${BASE_URL}routines/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
            });
            const result = await response.json()
            

            navigate("/userroutines")


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
            setThisRoutine(result)
        } catch (error) {
            console.log(error)
        }
    }
    //This function is adding an activity to the routine
    //This is where I am adding the activity to the array in routines

    async function addActivity(event) {
        event.preventDefault()
        // console.log("this is the typeof count", typeof activityId)
    try {
      const response = await fetch(`${BASE_URL}routines/${id}/activities`, {
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
      
      const addedActivity = activities.filter((activity) =>{
        return activity.id == activityId
      })[0]

      addedActivity.count = parseInt(count);
      addedActivity.duration = parseInt(duration);

      if(!result.error) {
        setTheseActivities([...theseActivities, addedActivity])
      }

      console.log(filteredRoutine[0])

      console.log(result);
      return result
    } catch (error) {
      console.error(error);
    }
  }


//   console.log(filteredRoutine)

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
                                <select placeholder="Select Activity" onChange={(event) => {
                                    setactivityId(event.target.value)}}>
                                    {
                                        props.activities.length ? props.activities.map(activity => {
                                            return (
                                                <option key={activity.name} value={activity.id}>{activity.name}</option>
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
                thisRoutine ? 
                        <div key={thisRoutine.id}> 
                            
                            <h2>{thisRoutine.name}</h2>
                            <div>
                                <h2>Routines</h2>
                            {theseActivities ? theseActivities.map((activity) => {
                                return (
                                    <div key={activity.id}>
                                        <p>{activity.name}</p>
                                        <p>{activity.description}</p>
                                        <p>Duration: {activity.duration}</p>
                                        <p>Count: {activity.count}</p>
                                        <RoutineActivities setTheseActivities = {setTheseActivities} theseActivities = {theseActivities} routineActivityId = {activity.routineActivityId} thisActivity = {activity}/>
                                    </div>
                                ) 
                            }) : "No activties for this routine"}
                            </div>
                            <h4>{thisRoutine.goal}</h4>
                            <h4>{thisRoutine.creatorName}</h4>

                        </div>
                 : ( <div> No data available </div> 
                )} 
            </div>
        


        </div>
  )



}

export default MySingleRoutine;