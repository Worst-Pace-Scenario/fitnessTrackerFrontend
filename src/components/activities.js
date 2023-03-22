import React, { useState, useEffect } from 'react';
import "./activities.css"
const BASE_URL = `https://fitnesstrac-kr.herokuapp.com/api`;

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [newActivityName, setNewActivityName] = useState('');
  const [newActivityDescription, setNewActivityDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/activities`);
        const result = await response.json();
        setActivities(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);


  const submit = async (event) => {
    event.preventDefault();
  
    let activityExists = false;
    for (let i = 0; i < activities.length; i++) {
      if (activities[i].name.toLowerCase() === newActivityName.toLowerCase()) {
        activityExists = true;
        break;
      }
    }
  
    if (activityExists) {
      setErrorMessage('Activity already exists');
      return;
    }
  
    try {
      const response = await fetch(`${BASE_URL}/activities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newActivityName,
          description: newActivityDescription,
        }),
      });
  
      const result = await response.json();
      setActivities([...activities, result]);
      setNewActivityName('');
      setNewActivityDescription('');
      setErrorMessage('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 id="activityHeader">Activity List</h1>
      <form id="createActivityForm" onSubmit={submit}>
        <h2>Create New Activity</h2>
        {errorMessage && <p>{errorMessage}</p>}
        <label>
          Name:
          <input type="text" value={newActivityName} onChange={(event) => setNewActivityName(event.target.value)} />
        </label>
        <label>
          Description:
          <input type="text" value={newActivityDescription} onChange={(event) => setNewActivityDescription(event.target.value)} />
        </label>
        <button type="submit">Create</button>
      </form>
      {activities.map(activity => (
        <div key={activity.id}>
          <h2>Activity: {activity.name}</h2>
          <p>Description: {activity.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Activities;
     
