import React from 'react';

function LoadList({ loads, onAssignLoad }) {
  return (
    <div>
      <h2>Assign Loads</h2>
      <ul>
        {loads.map(load => (
          <li key={load.id}>
            {load.description} - {load.pickup_location} to {load.dropoff_location}
            <button onClick={() => onAssignLoad(load.id)}>Assign</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LoadList;
