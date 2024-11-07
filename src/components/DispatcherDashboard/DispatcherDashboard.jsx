import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Route, Switch } from 'react-router-dom';
import LoadList from '../LoadList/LoadList';
import LoadForm from '../LoadForm/LoadForm';
import DriverInfoDispatcher from '../DriverInfoDispatcher/DriverInfoDispatcher';
import './DispatcherDashboard.css'; // Import the styling

function DispatcherDashboard() {
  const [loads, setLoads] = useState([]);

  useEffect(() => {
    fetchLoads();
  }, []);

  const fetchLoads = async () => {
    try {
      const response = await axios.get('/api/loads');
      setLoads(response.data);
    } catch (error) {
      console.error('Error fetching loads:', error);
    }
  };

  const addLoad = async (load) => {
    try {
      await axios.post('/api/loads', load);
      fetchLoads(); // Refresh the load list after adding
    } catch (error) {
      console.error('Error adding load:', error);
    }
  };

  const updateLoad = async (id, updatedLoad) => {
    try {
      await axios.put(`/api/loads/${id}`, updatedLoad);
      fetchLoads(); // Refresh the load list
    } catch (error)      {
      console.error('Error updating load:', error);
    }
  };

  const deleteLoad = async (id) => {
    try {
      await axios.delete(`/api/loads/${id}`);
      fetchLoads(); // Refresh the load list
    } catch (error) {
      console.error('Error deleting load:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dispatcher Dashboard</h1>

      {/* Navigation Bar placed under the dashboard title */}
      <div className="dashboard-nav-container">
        <nav className="dashboard-nav">
          <ul>
            <li>
              <Link className="nav-link" to="/dispatcher-dashboard/loads/add">Add Load</Link>
            </li>
            <li>
              <Link className="nav-link" to="/dispatcher-dashboard/loads">Manage Loads</Link>
            </li>
            <li>
              <Link className="nav-link" to="/dispatcher-dashboard/loads/driver">Driver Information</Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Routing Content */}
      <Switch>
        <Route exact path="/dispatcher-dashboard/loads">
          <h2 className="section-title"></h2>
          <LoadList loads={loads} onDelete={deleteLoad} onUpdate={updateLoad} />
        </Route>

        <Route path="/dispatcher-dashboard/loads/add">
          <h2 className="section-title"></h2>
          <LoadForm onAdd={addLoad} />
        </Route>

        <Route path="/dispatcher-dashboard/loads/driver">
          <h2 className="section-title"></h2>
          <DriverInfoDispatcher />
        </Route>
      </Switch>
    </div>
  );
}

export default DispatcherDashboard;
