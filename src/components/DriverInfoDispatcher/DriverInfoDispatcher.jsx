import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DriverInfoDispatcher.css'

function DriverInfoDispatcher() {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    console.log('Attempting to fetch driver info')
    try {
      const response = await axios.get('/api/loads/driver');
      console.log('fetched driver:', response.data);
      setDrivers(response.data);
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };

  return (
    <div className="driver-info-container">
      <h2 className="driver-info-header">Driver Information</h2>
      <table className="driver-info-table">
        <thead>
          <tr>
            <th>Location</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Driver ID</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map(driver => (
            <tr key={driver.id}>
              <td>{driver.location}</td>
              {driver.start_time && <td>{new Date(driver.start_time).toLocaleString()}</td>} 
              {!driver.start_time && <td>No Start Time</td>} 
              {driver.end_time && <td>{new Date(driver.end_time).toLocaleString()}</td>} 
              {!driver.end_time && <td>No End Time</td>}
              <td>{driver.user_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DriverInfoDispatcher;
