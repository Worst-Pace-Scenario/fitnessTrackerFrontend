import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import MySingleRoutine from "./MySingleRoutine"


const RoutineActivities = (props) => {
    const [count, setCount] = useState("")
    const [duration, setDuration] = useState("")
    const [updateActivity, setUpdateActivity] = useState(false)
    const [myActivities, setMyActivities] = useState("")

    const {id} = useParams()

    const {setTheseActivities, theseActivities ,routineActivityId, thisActivity} = props;

    function toggleUpdateActivity() {
        setUpdateActivity(!updateActivity)
    }

  //This function is updating an activity
  async function updateActivities(event) {
    event.preventDefault();
    try {
      const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/routine_activities/${routineActivityId}`, {
        method: "PATCH",
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          count: parseInt(count),
          duration: parseInt(duration)
        })
      });
      const result = await response.json();

      if(!result.error){
        const copy = [...theseActivities]

        for(let i = 0; i < copy.length; i ++) {
          if(copy[i].routineActivityId == routineActivityId){
            copy[i].count = count
            copy[i].duration = duration
          }
        }
        setUpdateActivity(!updateActivity)
        setTheseActivities(copy)
      }else{
        alert(result.error)
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteActivity(event) {
    event.preventDefault()
    try {
        const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/routine_activities/${routineActivityId}`, {
        method : `DELETE`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
          },
        });
        const result = await response.json()

        let filteredActivityDelete = theseActivities.filter((singleActivity) => {
            if(singleActivity.routineActivityId != routineActivityId) {
                return singleActivity
            }
        })
        
        setTheseActivities(filteredActivityDelete)

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
                placeholder={thisActivity.count}
                value={count}
                onChange={(event) => setCount(event.target.value)}
                />
                <input
                type="text"
                placeholder={thisActivity.duration}
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