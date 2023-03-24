import { useState, useEffect } from "react"

const BASE_URL ='http://fitnesstrac-kr.herokuapp.com/api/'

const UserRoutines = (props) => {

    const { currentUser } = props 
    // routines as props 
    const [ myId, setMyId ] = useState('')
    const [ myUsername, setMyUsername ] = useState ('')
    const [ myRoutines, setMyRoutines ] = useState([])
    

    const myData = async () => {

    try {  
        const response = await fetch(`${BASE_URL}/users/${currentUser}/routines`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            }
        })
        const result = await response.json()
        console.log(result);
        setMyRoutines(result);
        
    } catch (error) {
        console.log(error)

    }
    }

    useEffect(() => {
        // if cuurentUser is true 
        myData();
    }, [currentUser])

    console.log(myRoutines)
    // filter through data here 
    // filteredRoutines 

    if (myRoutines.success) {
        let filteredMyRoutinesArray = myRoutines.filter((myRoutinesElement) => {
            if (myRoutinesElement.id != event.target.value) {
                return myRoutinesElement
            }
        })
        setMyRoutines(filteredMyRoutinesArray)
    }
    if (myRoutines.success) {
        let myRoutinesData = myRoutines.data.filter((myRoutinesElement) => {
          if (myRoutinesElement.id != event.target.value) {
            return false;
          }
          return true;
        });
        setMyRoutines(myRoutinesData);
      }
    return (
        // render data 
        <p> Placeholder</p>
    )
}

export default UserRoutines


