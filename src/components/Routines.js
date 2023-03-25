import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

const Routines = (props) => {
    let filteredRoutine = props.routines.filter((singleRoutinesElement) => {
        return (
            singleRoutinesElement.creatorName = props.currentUser.username
        )
    })
    

    return (
        <div>
            {
            filteredRoutine.length > 0 ? (filteredRoutine.map((singleRoutinesElement) => {
                   return (
                        <div key={singleRoutinesElement.id}> 
                            
                            <h2>{singleRoutinesElement.name}</h2>
                            <h4>{singleRoutinesElement.goal}</h4>
                            
                        </div>
                   )
                })
                ) : ( <div> No data available </div> 
                )}

        </div>
    )
}

export default Routines


