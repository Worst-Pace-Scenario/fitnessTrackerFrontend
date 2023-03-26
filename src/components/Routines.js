import { useState } from "react"
import { useParams, useNavigate,Link } from "react-router-dom"

const Routines = (props) => {
    let filteredRoutine = props.routines

    return (
        <div>
            {
            filteredRoutine.length > 0 ? (filteredRoutine.map((singleRoutinesElement) => {
                   return (
                   <Link to= {`/routines/${singleRoutinesElement.id}`}>
                        <div key={singleRoutinesElement.id}> 
                            
                            <h2>{singleRoutinesElement.name}</h2>
                            <h4>{singleRoutinesElement.goal}</h4>
                            
                        </div>
                    </Link>
                   )
                })
                ) : ( <div> No data available </div> 
                )}

        </div>
    )
}

export default Routines


