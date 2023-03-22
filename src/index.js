import { useEffect, useState } from "react";
import {createRoot} from "react-dom/client";

const App = () => {
    const [activities, setActivities] = useState([])
    const [routines, setRoutines] = useState([]);
    const [currentUser, setCurrentUser] = useState({});

    async function fetchActivities(){
        try {
            const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/activties`)

            const data = await response.json();

            setActivities(data);
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchRoutines(){
        try {
            const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/routines`);

            const data = await response.json();

            setRoutines(data);
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchCurrentUser(){
        if (localStorage.token){
            try {
                const response = await fetch(`$http://fitnesstrac-kr.herokuapp.com/api/users/me`, {
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${localStorage.token}`
                    },
                  });

                const data = await response.json();

                setCurrentUser(data)
            } catch (error) {
                console.log(error)
            }
        }
        else{
            setCurrentUser("")
        }
    }

    useEffect(()=>{
        fetchActivities;
        fetchCurrentUser;
        fetchRoutines
    },[])

    return (
        <div>Hi</div>
    )
}

const appElt = document.getElementById("app");
const root = createRoot(appElt);
root.render(<App />)