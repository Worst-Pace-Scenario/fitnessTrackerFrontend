import { useState } from "react";
import {createRoot} from "react-dom/client";

const App = () =>{
    const [activities, setActivities] = useState([])
    const [routines, setRoutines] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);

    return(
       <div></div> 
    )
}

const appElt = document.getElementById("app");
const root = createRoot(appElt);
root.render(<App />)