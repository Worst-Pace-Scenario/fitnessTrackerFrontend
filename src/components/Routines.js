import { useState } from "react"
import { useParams, useNavigate,Link } from "react-router-dom"
import "./Routines.css"

const Routines = (props) => {
    let filteredRoutine = props.routines

    return (
        <div>
            <h3 id="header"> Here you can find all the routines </h3>
            {
            filteredRoutine.length > 0 ? (filteredRoutine.map((singleRoutinesElement) => {
                   return (
                   <Link to= {`/routines/${singleRoutinesElement.id}`}>
                        <div id="routines" key={singleRoutinesElement.id}> 
                            
                            <h2 id="link">{singleRoutinesElement.name}</h2>
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


