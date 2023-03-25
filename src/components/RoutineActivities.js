import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import MySingleRoutine from "./MySingleRoutine"


const RoutineActivities = () => {
    const [count, setCount] = useState("")
    const [duration, setDuration] = useState("")
    const [updateActivity, setUpdateActivity] = useState(false)
    const [myActivities, setMyActivities] = useState("")

    const {id} = useParams()

    function toggleUpdateActivity() {
        setUpdateActivity(!updateActivity)
    }

  //This function is updating an activity
  async function updateActivities(event) {
    event.preventDefault();
    try {
      const response = await fetch(`https://fitnesstrac-kr.herokuapp.com/routine_activities/${id}`, {
        method: "PATCH",
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          count: count,
          duration: duration
        })
      });
      const result = await response.json();
      console.log(result);
      setMyActivities(result)
      return result
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteActivity(event) {
    event.preventDefault()
    try {
        const response = await fetch(`https://fitnesstrac-kr.herokuapp.com/routine_activities/${id}`, {
          headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
          },
        });
        const result = await response.json()

        let filteredActivityDelete = props.activities.filter((singleActivity) => {
            if(singleActivity.id != id ) {
                return singleActivity
            }
        })
        setMyActivities(filteredActivityDelete)
        
        navigate("/userroutines")

        console.log(result);
        return result
      } catch (error) {
        console.error(error);
      }
  }





    return (
        <div>
            <button onClick={toggleUpdateActivity}>Update Activity</button>
            {
            updateActivity ? (

            <form onSubmit={updateActivities}>
                <input type="text" 
                placeholder="count"
                value={count}
                onChange={(event) => setCount(event.target.value)}
                />
                <input
                type="text"
                placeholder="duration"
                value={duration}
                onChange={(event) => setDuration(event.target.value)}
                />
                <button type="submit">Update Activities</button>
            </form>
            ) : ""
}
       <button onClick={deleteActivity}>Delete Activity</button>     
        </div>
    )
}
export default RoutineActivities