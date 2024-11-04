import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import LoadList from '../LoadList/LoadList';
import LoadForm from '../LoadForm/LoadForm';

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
      fetchLoads(); // Refresh the load list
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
   
      <div>
        <h1>Dispatcher Dashboard</h1>
        <nav>
          <ul>
            <li><Link to="/dispatcher-dashboard/loads">Manage Loads</Link></li>
          </ul>
        </nav>
        <Route path="/dispatcher-dashboard/loads">
            <LoadList loads={loads} onDelete={deleteLoad} onUpdate={updateLoad} />
            <LoadForm onAdd={addLoad} />
          </Route>
      </div>
   
  );
}

export default DispatcherDashboard;
