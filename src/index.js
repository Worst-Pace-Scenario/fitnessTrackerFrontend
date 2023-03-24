import { useEffect, useState } from "react";
import {createRoot} from "react-dom/client";
import { BrowserRouter,Route, Routes, Link } from "react-router-dom";
import { Nav,Home, Activities, UserLogin, UsersRegistration, Routines, MySingleRoutine, UserRoutines } from "./components";


const App = () => {
    const [activities, setActivities] = useState([])
    const [routines, setRoutines] = useState([]);
    const [currentUser, setCurrentUser] = useState({});

    async function fetchActivities(){
        try {
            const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/activities`)

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
                const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/users/me`, {
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
        fetchActivities();
        fetchCurrentUser();
        fetchRoutines();
        
    },[])

    console.log(activities, routines, currentUser)

    return ( 
        <BrowserRouter>
            <Nav currentUser = {currentUser} />

            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/activites" element={<Activities currentUser={currentUser}/>}/>
                <Route path="/routines" element={<Routines routines={routines} activities={activities}/>} />
                <Route path="/userroutines" element={<UserRoutines currentUser={currentUser} routines={routines}/>}/>
                {/* <Route path="/myroutines" element={<MyRoutines routines={routines} currentUser={currentUser}/>}/> */}
                <Route path="/mysingleroutine" element={<MySingleRoutine routines={routines} activities={activities} currentUser={currentUser}/>}/>
                <Route path="/login" element={<UserLogin />}/>
                <Route path="/register" element={<UsersRegistration />}/>
            </Routes>
        </BrowserRouter>
    )
}

const appElt = document.getElementById("app");
const root = createRoot(appElt);
root.render(<App />)