import React, { useState } from 'react';
import axios from 'axios';

function DriverDashboard() {
  const [location, setLocation] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const [brakes, setBrakes] = useState('');
  const [tires, setTires] = useState('');
  const [lights, setLights] = useState('');
  const [fluids, setFluids] = useState('');
  const [electricalSystems, setElectricalSystems] = useState('');
  const [wipers, setWipers] = useState('');

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

  const handleInspectionSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/vehicle-inspection', {
      brakes,
      tires,
      lights,
      fluids,
      electrical_systems: electricalSystems,
      wipers
    })
      .then(response => {
        console.log('Inspection log saved', response);
        setBrakes('');  // Resetting state after submission
        setTires('');   // Resetting state after submission
        setLights('');  // Resetting state after submission
        setFluids('');  // Resetting state after submission
        setElectricalSystems('');  // Resetting state after submission
        setWipers('');  // Resetting state after submission
      })
      .catch(error => {
        console.log('Error saving inspection log', error);
      });
  };

  return (
    <div>
      <h1>Driver Dashboard</h1>
      <nav>
        <ul>
          <li><a href="#driver-info">Driver Information</a></li>
          <li><a href="#vehicle-inspection">Vehicle Inspection</a></li>
          <li><a href="#load-information">Load Information</a></li>
        </ul>
      </nav>

      <div id="driver-info">
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

      <div id="vehicle-inspection">
        <h2>Vehicle Inspection</h2>
        <form onSubmit={handleInspectionSubmit}>
          <label>
            Brakes:
            <input type="radio" name="brakes" value="true" onChange={(e) => setBrakes(e.target.value)} /> Yes
            <input type="radio" name="brakes" value="false" onChange={(e) => setBrakes(e.target.value)} /> No
          </label>
          <br />
          <label>
            Tires:
            <input type="radio" name="tires" value="true" onChange={(e) => setTires(e.target.value)} /> Yes
            <input type="radio" name="tires" value="false" onChange={(e) => setTires(e.target.value)} /> No
          </label>
          <br />
          <label>
            Lights:
            <input type="radio" name="lights" value="true" onChange={(e) => setLights(e.target.value)} /> Yes
            <input type="radio" name="lights" value="false" onChange={(e) => setLights(e.target.value)} /> No
          </label>
          <br />
          <label>
            Fluids:
            <input type="radio" name="fluids" value="true" onChange={(e) => setFluids(e.target.value)} /> Yes
            <input type="radio" name="fluids" value="false" onChange={(e) => setFluids(e.target.value)} /> No
          </label>
          <br />
          <label>
            Electrical Systems:
            <input type="radio" name="electricalSystems" value="true" onChange={(e) => setElectricalSystems(e.target.value)} /> Yes
            <input type="radio" name="electricalSystems" value="false" onChange={(e) => setElectricalSystems(e.target.value)} /> No
          </label>
          <br />
          <label>
            Wipers:
            <input type="radio" name="wipers" value="true" onChange={(e) => setWipers(e.target.value)} /> Yes
            <input type="radio" name="wipers" value="false" onChange={(e) => setWipers(e.target.value)} /> No
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>

      <div id="load-information">
        <h2>Load Information</h2>
        {/* Load info will go here */}
      </div>
    </div>
  );
}

export default DriverDashboard;
