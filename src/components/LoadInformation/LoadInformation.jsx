import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DriverLoadList({ userId }) {
  const [loads, setLoads] = useState([]);

  useEffect(() => {
    // Ensure the userId exists before making the request
    if (userId) {
      fetchLoads();
    }
  }, [userId]);  // Re-fetch if the userId changes

  const fetchLoads = async () => {
    try {
      const response = await axios.get(`/api/loads/${userId}`);
      setLoads(response.data);
    } catch (error) {
      console.error('Error fetching loads for driver:', error);
    }
  };

  return (
    <div>
      <h2>Loads Assigned to Driver</h2>
      {loads.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Time</th>
              <th>Pickup Location</th>
              <th>Dropoff Location</th>
            </tr>
          </thead>
          <tbody>
            {loads.map(load => (
              <tr key={load.id}>
                <td>{load.description}</td>
                <td>{new Date(load.time).toLocaleString()}</td>
                <td>{load.pickup_location}</td>
                <td>{load.dropoff_location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No loads assigned</p>
      )}
    </div>
  );
}

export default DriverLoadList;
