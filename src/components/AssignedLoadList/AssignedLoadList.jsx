import React from 'react';

function AssignedLoadList({ assignedLoads }) {
  return (
    <div>
      <h2>Assigned Loads</h2>
      <ul>
        {assignedLoads.map(al => (
          <li key={al.id}>
            Load ID: {al.load_id}, User ID: {al.user_id}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AssignedLoadList;
