import React, { useState } from 'react';
import LoadForm from '../LoadForm/LoadForm';
import './LoadList.css'; // Import the styling

function LoadList({ loads, onDelete, onUpdate }) {
  const [editingLoad, setEditingLoad] = useState(null);

  const handleEditClick = (load) => {
    setEditingLoad(load);
  };

  const handleCancelEdit = () => {
    setEditingLoad(null);
  };

  const handleUpdate = (updatedLoad) => {
    onUpdate(updatedLoad.id, updatedLoad);
    setEditingLoad(null); // Close edit form
  };

  return (
    <div className="load-list-container">
      <h2 className="load-list-title">Manage Loads</h2>
      <table className="load-list-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Pickup Location</th>
            <th>Dropoff Location</th>
            <th>Time</th>
            <th>Driver ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loads.map((load) => (
            <tr key={load.id}>
              {editingLoad && editingLoad.id === load.id ? (
                <td colSpan="6">
                  <LoadForm
                    initialLoad={editingLoad}
                    onUpdate={handleUpdate}
                    onCancel={handleCancelEdit}
                  />
                </td>
              ) : (
                <>
                  <td>{load.description || 'No Description'}</td>
                  <td>{load.pickup_location}</td>
                  <td>{load.dropoff_location}</td>
                  <td>{new Date(load.time).toLocaleString()}</td>
                  <td>{load.user_id}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEditClick(load)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => onDelete(load.id)}
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LoadList;
