const express = require('express');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const pool = require("../modules/pool");
const router = express.Router();

router.post('/assign-load', rejectUnauthenticated, (req, res) => {
    const { load_id, user_id } = req.body;
    const queryText = `INSERT INTO "load_assignments" (load_id, user_id) VALUES ($1, $2) RETURNING id`;
    pool.query(queryText, [load_id, user_id])
      .then(result => res.json({ id: result.rows[0].id }))
      .catch((err) => {
        console.log('Error assigning load:', err);
        res.sendStatus(500);
      });
  });
  
  // Route to fetch all assigned loads
  router.get('/assigned-loads', rejectUnauthenticated, (req, res) => {
    const queryText = `
      SELECT la.id, la.load_id, la.user_id, l.description, l.time, l.pickup_location, l.dropoff_location 
      FROM "load_assignments" la
      JOIN "loads" l ON la.load_id = l.id
    `;
    pool.query(queryText)
      .then(result => res.json(result.rows))
      .catch((err) => {
        console.log('Error fetching assigned loads:', err);
        res.sendStatus(500);
      });
  });
  
  module.exports = router;

