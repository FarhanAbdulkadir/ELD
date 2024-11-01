import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import LoadList from '../LoadList/LoadList';
import AssignedLoadList from '../AssignedLoadList/AssignedLoadList';
import DrivingLogList from '../DrivingLogList/DrivingLogList';

function DispatcherDashboard() {
  const [loads, setLoads] = useState([]);
  const [assignedLoads, setAssignedLoads] = useState([]);
  const [drivingLogs, setDrivingLogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loadsResponse = await axios.get('/api/loads');
        setLoads(loadsResponse.data);

        const assignedLoadsResponse = await axios.get('/api/load-assignments');
        setAssignedLoads(assignedLoadsResponse.data);

        const drivingLogsResponse = await axios.get('/api/driving-log');
        setDrivingLogs(drivingLogsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const assignLoad = (loadId) => {
    const userId = prompt("Please enter the user ID for assignment:");
    axios.post('/api/assign-load', { load_id: loadId, user_id: userId })
      .then(response => {
        console.log('Load assigned', response.data);
        setAssignedLoads([...assignedLoads, response.data]);
      })
      .catch(error => console.error('Error assigning load:', error));
  };

  return (
    <Router>
      <div>
        <h1>Dispatcher Dashboard</h1>
        <nav>
          <ul>
            <li><Link to="/loads">Assign Loads</Link></li>
            <li><Link to="/assigned-loads">Assigned Loads</Link></li>
            <li><Link to="/driving-logs">Driving Logs</Link></li>
          </ul>
        </nav>
        <Switch>
          <Route path="/loads">
            <LoadList loads={loads} onAssignLoad={assignLoad} />
          </Route>
          <Route path="/assigned-loads">
            <AssignedLoadList assignedLoads={assignedLoads} />
          </Route>
          <Route path="/driving-logs">
            <DrivingLogList drivingLogs={drivingLogs} />
          </Route>
          <Route path="/" exact>
            <h2>Welcome to the Dispatcher Dashboard</h2>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default DispatcherDashboard;
