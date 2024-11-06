import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

function DrivingLogForm() {

  const [userId, SetUserId] = useState('');
  const [location, setLocation] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleLogSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/driving-log', { 
      location, 
      start_time: startTime || null,
      end_time: endTime || null,
      user_id: userId })
      .then(response => {
        console.log('Driving log saved', response);
        // display success alert 
        swal("success!", "driver info sent successfully", response)
        SetUserId('');
        setLocation('');
        setStartTime('');
        setEndTime('');
        
      })
      .catch(error => {
        console.log('Error saving driving log', error);
        // display alert error 
        swal("error!", "there was an error sending driver info", "error")

      });
  };

  return (
    <div>
      <h2>Driver Information</h2>
      <form onSubmit={handleLogSubmit}>
        <label >
          userId:
          <input type='number' value={userId} onChange={(e)=>SetUserId(e.target.value)} required />
        </label>
        <br />
        <label>
          Location:
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
        </label>
        <br />
        <label>
          Start Time:
          <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)}  />
        </label>
        <br />
        <label>
          End Time:
          <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default DrivingLogForm;
