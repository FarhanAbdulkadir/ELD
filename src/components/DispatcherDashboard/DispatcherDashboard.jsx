import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Route, Switch } from 'react-router-dom';
import LoadList from '../LoadList/LoadList';
import LoadForm from '../LoadForm/LoadForm';
import DriverInfoDispatcher from '../DriverInfoDispatcher/DriverInfoDispatcher';
import './DispatcherDashboard.css'; // Import your updated styling

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
    } catch (error) {
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
      {/* Main Navigation bar */}
      {/* <h1 className="dashboard-title">Dispatcher Dashboard</h1> */}

      {/* Side Navigation */}
      <div className="sidenav">
        <ul>
          <li>
            <Link className="nav-btn" to="/dispatcher-dashboard/loads/add">
              <button className="nav-button">Add Load</button>
            </Link>
          </li>
          <li>
            <Link className="nav-btn" to="/dispatcher-dashboard/loads">
              <button className="nav-button">Manage Loads</button>
            </Link>
          </li>
          <li>
            <Link className="nav-btn" to="/dispatcher-dashboard/loads/driver">
              <button className="nav-button">Driver Information</button>
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        <Switch>
          <Route exact path="/dispatcher-dashboard/loads">
            <LoadList loads={loads} onDelete={deleteLoad} onUpdate={updateLoad} />
          </Route>
          <Route path="/dispatcher-dashboard/loads/add">
            <LoadForm onAdd={addLoad} />
          </Route>
          <Route path="/dispatcher-dashboard/loads/driver">
            <DriverInfoDispatcher />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default DispatcherDashboard;
