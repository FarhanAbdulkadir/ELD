import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DriverLoadList.css'; // Import the CSS file

function DriverLoadList() {
  const [loads, setLoads] = useState([]);

  useEffect(() => {
    // Fetch the loads data when the component mounts
    fetchLoads();
  }, []);  // Re-fetch if the userId changes

  const fetchLoads = async () => {
    try {
      const response = await axios.get(`/api/driving-log/loads`);
      setLoads(response.data);
    } catch (error) {
      console.error('Error fetching loads for driver:', error);
    }
  };

  return (
    <div className="load-list-container">
      <h2 className="load-list-title">Loads</h2>
      {loads.length > 0 ? (
        <table className="load-table">
          <thead>
            <tr>
              <th className="table-header">Description</th>
              <th className="table-header">Time</th>
              <th className="table-header">Pickup Location</th>
              <th className="table-header">Dropoff Location</th>
            </tr>
          </thead>
          <tbody>
            {loads.map(load => (
              <tr key={load.id} className="table-row">
                <td>{load.description}</td>
                <td>{new Date(load.time).toLocaleString()}</td>
                <td>{load.pickup_location}</td>
                <td>{load.dropoff_location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-loads-message">No loads assigned</p>
      )}
    </div>
  );
}

export default DriverLoadList;
