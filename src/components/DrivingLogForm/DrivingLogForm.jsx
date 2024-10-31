import React, { useState } from 'react';
import axios from 'axios';

function DrivingLogForm() {
  const [location, setLocation] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleLogSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/driving-log', { location, start_time: startTime, end_time: endTime })
      .then(response => {
        console.log('Driving log saved', response);
        setLocation('');
        setStartTime('');
        setEndTime('');
      })
      .catch(error => {
        console.log('Error saving driving log', error);
      });
  };

  return (
    <div>
      <h2>Driver Information</h2>
      <form onSubmit={handleLogSubmit}>
        <label>
          Location:
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
        </label>
        <br />
        <label>
          Start Time:
          <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
        </label>
        <br />
        <label>
          End Time:
          <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default DrivingLogForm;
