import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DispatcherDashboard() {
  const [loads, setLoads] = useState([]);
  const [assignedLoads, setAssignedLoads] = useState([]);
  const [drivingLogs, setDrivingLogs] = useState([]);

  useEffect(() => {
    axios.get('/api/loads')
      .then(response => setLoads(response.data))
      .catch(error => console.error('Error fetching loads:', error));

    axios.get('/api/load-assignments')
      .then(response => setAssignedLoads(response.data))
      .catch(error => console.error('Error fetching assigned loads:', error));

    axios.get('/api/driving-log')
      .then(response => setDrivingLogs(response.data))
      .catch(error => console.error('Error fetching driving logs:', error));
  }, []);

  const assignLoad = (loadId, userId) => {
    axios.post('/api/assign-load', { load_id: loadId, user_id: userId })
      .then(response => {
        console.log('Load assigned', response.data);
        setAssignedLoads([...assignedLoads, response.data]);
      })
      .catch(error => console.error('Error assigning load:', error));
  };

  return (
    <div>
      <h1>Dispatcher Dashboard</h1>

      <h2>Assign Loads</h2>
      <ul>
        {loads.map(load => (
          <li key={load.id}>
            {load.description} - {load.pickup_location} to {load.dropoff_location}
            <button onClick={() => assignLoad(load.id, /* User ID here */)}>Assign</button>
          </li>
        ))}
      </ul>

      <h2>Assigned Loads</h2>
      <ul>
        {assignedLoads.map(al => (
          <li key={al.id}>
            Load ID: {al.load_id}, User ID: {al.user_id}
          </li>
        ))}
      </ul>

      <h2>Driving Logs</h2>
      <ul>
        {drivingLogs.map(log => (
          <li key={log.id}>
            Location: {log.location}, Start Time: {new Date(log.start_time).toLocaleString()}, End Time: {new Date(log.end_time).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DispatcherDashboard;
