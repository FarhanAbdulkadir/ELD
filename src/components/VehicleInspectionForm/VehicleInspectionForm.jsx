import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

function VehicleInspectionForm() {
  const [brakes, setBrakes] = useState(false);
  const [tires, setTires] = useState(false);
  const [lights, setLights] = useState(false);
  const [fluids, setFluids] = useState(false);
  const [electricalSystems, setElectricalSystems] = useState(false);
  const [wipers, setWipers] = useState(false);

  const handleInspectionSubmit = (e) => {
    e.preventDefault();
    axios.post(`/api/driving-log/inspection`, {
      brakes,
      tires,
      lights,
      fluids,
      electrical_systems: electricalSystems,
      wipers,
    })
    .then(response => {
      console.log('Inspection log saved', response);
      // Display success alert 
      swal("success!", "inspection log saved successfully!", response)
      // Resetting state after submission
      setBrakes(false);
      setTires(false);
      setLights(false);
      setFluids(false);
      setElectricalSystems(false);
      setWipers(false);
    })
    .catch(error => {
      console.log('Error saving inspection log', error);
      // Display error alert
      swal("error!", "there was an error saving the inspection log", "error")
    });
  };

  return (
    <div>
      <h2>Vehicle Inspection</h2>
      <form onSubmit={handleInspectionSubmit}>
        <label>
          Brakes:
          <input type="radio" name="brakes" checked={brakes} onChange={() => setBrakes(true)} /> Yes
          <input type="radio" name="brakes" checked={!brakes} onChange={() => setBrakes(false)} /> No
        </label>
        <br />
        <label>
          Tires:
          <input type="radio" name="tires" checked={tires} onChange={() => setTires(true)} /> Yes
          <input type="radio" name="tires" checked={!tires} onChange={() => setTires(false)} /> No
        </label>
        <br />
        <label>
          Lights:
          <input type="radio" name="lights" checked={lights} onChange={() => setLights(true)} /> Yes
          <input type="radio" name="lights" checked={!lights} onChange={() => setLights(false)} /> No
        </label>
        <br />
        <label>
          Fluids:
          <input type="radio" name="fluids" checked={fluids} onChange={() => setFluids(true)} /> Yes
          <input type="radio" name="fluids" checked={!fluids} onChange={() => setFluids(false)} /> No
        </label>
        <br />
        <label>
          Electrical Systems:
          <input type="radio" name="electricalSystems" checked={electricalSystems} onChange={() => setElectricalSystems(true)} /> Yes
          <input type="radio" name="electricalSystems" checked={!electricalSystems} onChange={() => setElectricalSystems(false)} /> No
        </label>
        <br />
        <label>
          Wipers:
          <input type="radio" name="wipers" checked={wipers} onChange={() => setWipers(true)} /> Yes
          <input type="radio" name="wipers" checked={!wipers} onChange={() => setWipers(false)} /> No
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default VehicleInspectionForm;
