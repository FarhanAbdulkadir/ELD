import React, { useState } from 'react';
import axios from 'axios';

function VehicleInspectionForm() {
  const [brakes, setBrakes] = useState('');
  const [tires, setTires] = useState('');
  const [lights, setLights] = useState('');
  const [fluids, setFluids] = useState('');
  const [electricalSystems, setElectricalSystems] = useState('');
  const [wipers, setWipers] = useState('');

  const handleInspectionSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/vehicle-inspection', {
      brakes,
      tires,
      lights,
      fluids,
      electrical_systems: electricalSystems,
      wipers,
    })
    .then(response => {
      console.log('Inspection log saved', response);
      // Resetting state after submission
      setBrakes('');
      setTires('');
      setLights('');
      setFluids('');
      setElectricalSystems('');
      setWipers('');
    })
    .catch(error => {
      console.log('Error saving inspection log', error);
    });
  };

  return (
    <div>
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
  );
}

export default VehicleInspectionForm;
