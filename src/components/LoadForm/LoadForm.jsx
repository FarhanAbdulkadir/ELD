import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';

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
      swal("Success!", "Load updated successfully!", "success")
    } else {
      onAdd(load); // Add new load
      swal("Success!", "Load added successfully!", "success");
    }
    setLoad({ description: '', time: '', pickup_location: '', dropoff_location: '', user_id: '' }); // Reset form
  };
// Handling errors 
const handleError = (error) => { 
  console.log('Error:', error); 
  
  swal("Error!", "An error occurred while processing the load.", "error");

};
  return (
    <form onSubmit={handleSubmit}>
      <h3>{initialLoad ? 'Edit Load' : 'Add New Load'}</h3>
      <input
        name="description"
        value={load.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <input
        name="time"
        type="datetime-local"
        value={load.time}
        onChange={handleChange}
        required
      />
      <input
        name="pickup_location"
        value={load.pickup_location}
        onChange={handleChange}
        placeholder="Pickup Location"
        required
      />
      <input
        name="dropoff_location"
        value={load.dropoff_location}
        onChange={handleChange}
        placeholder="Dropoff Location"
        required
      />
      <input
        name="user_id"
        type="number"
        value={load.user_id}
        onChange={handleChange}
        placeholder="User ID"
        required
      />
      <button type="submit">{initialLoad ? 'Update Load' : 'Add Load'}</button>
      {initialLoad && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
}

export default LoadForm;
