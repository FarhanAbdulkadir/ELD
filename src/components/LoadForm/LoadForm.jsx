import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import './LoadForm.css';

function LoadForm({ initialLoad, onUpdate, onAdd, onCancel }) {
  const [load, setLoad] = useState({
    description: '',
    time: '',
    pickup_location: '',
    dropoff_location: '',
    user_id: ''
  });

  useEffect(() => {
    if (initialLoad) {
      setLoad(initialLoad);
    }
  }, [initialLoad]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoad({ ...load, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (initialLoad) {
      onUpdate(load); // Update existing load
      swal("Success!", "Load updated successfully!", "success");
    } else {
      onAdd(load); // Add new load
      swal("Success!", "Load added successfully!", "success");
    }
    setLoad({ description: '', time: '', pickup_location: '', dropoff_location: '', user_id: '' }); // Reset form
  };

  const handleError = (error) => {
    console.log('Error:', error);
    swal("Error!", "An error occurred while processing the load.", "error");
  };

  return (
    <div className="load-form-container">
      <form className="load-form" onSubmit={handleSubmit}>
        <h3 className="load-form-header">{initialLoad ? 'Edit Load' : 'Add New Load'}</h3>
        <table className="load-form-table">
          <tbody>
            <tr>
              <td><label htmlFor="description">Description</label></td>
              <td><input
                id="description"
                name="description"
                value={load.description}
                onChange={handleChange}
                placeholder="Description"
                required
              /></td>
            </tr>
            <tr>
              <td><label htmlFor="time">Time</label></td>
              <td><input
                id="time"
                name="time"
                type="datetime-local"
                value={load.time}
                onChange={handleChange}
                required
              /></td>
            </tr>
            <tr>
              <td><label htmlFor="pickup_location">Pickup Location</label></td>
              <td><input
                id="pickup_location"
                name="pickup_location"
                value={load.pickup_location}
                onChange={handleChange}
                placeholder="Pickup Location"
                required
              /></td>
            </tr>
            <tr>
              <td><label htmlFor="dropoff_location">Dropoff Location</label></td>
              <td><input
                id="dropoff_location"
                name="dropoff_location"
                value={load.dropoff_location}
                onChange={handleChange}
                placeholder="Dropoff Location"
                required
              /></td>
            </tr>
            <tr>
              <td><label htmlFor="user_id">Driver ID </label></td>
              <td><input
                id="user_id"
                name="user_id"
                type="number"
                value={load.user_id}
                onChange={handleChange}
                placeholder="Driver ID"
                required
              /></td>
            </tr>
          </tbody>
        </table>
        <div className="form-actions">
          <button className="submit-btn" type="submit">
            {initialLoad ? 'Update Load' : 'Add Load'}
          </button>
          {initialLoad && (
            <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
          )}
        </div>
      </form>
    </div>
  );
}

export default LoadForm;
