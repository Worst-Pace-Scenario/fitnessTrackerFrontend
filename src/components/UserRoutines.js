import { useEffect, useState } from "react"

const BASE_URL = 'http://fitnesstrac-kr.herokuapp.com/api/' 

const UserRoutines = (props) => {
    const { currentUser, routines } = props 
    const [ myRoutines, setMyRoutines ] = useState ([])

    const fetchMyData = async () => {

        try {
            const response = await fetch(`${BASE_URL}/users/${currentUser}/routines`,{
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            })
            const result = await response.json()
            console.log(result)
            setMyRoutines(result) // result or myRoutinesData
        } catch (e) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchMyData();
    }, [currentUser])

    console.log(myRoutines)

    return (
        <section> 
            {
                myRoutines.map(routines => (
                    <div key={routines._id}> 
                        <p> Placeholder </p>
                        <p> Placeholder </p>

                    </div>
                ))
            }
        </section>
    )
}

export default UserRoutines