const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/api/vehicle-inspection', rejectUnauthenticated, (req, res) => {
  const { brakes, tires, lights, fluids, electrical_systems, wipers } = req.body;
  const driver_id = req.user.id;
  const queryText = `INSERT INTO "Inspection" ("driver_id", "brakes", "tires", "lights", "fluids", "electrical_systems", "wipers")
                     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING "vehicle_id"`;
  
  pool.query(queryText, [driver_id, brakes, tires, lights, fluids, electrical_systems, wipers])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('Error saving vehicle inspection:', err);
      res.sendStatus(500);
    });
});

module.exports = router;
