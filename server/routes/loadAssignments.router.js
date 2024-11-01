const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require("../modules/pool");
const router = express.Router();

// Route to assign a load
router.post('/assign-load', rejectUnauthenticated, (req, res) => {
    const { load_id, user_id } = req.body;
    const queryText = `INSERT INTO "load_assignments" ("load_id", "user_id") VALUES ($1, $2) RETURNING "id"`;
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
      SELECT "la"."id", "la"."load_id", "la"."user_id", "l"."description", "l"."time", "l"."pickup_location", "l"."dropoff_location" 
      FROM "load_assignments" AS "la"
      JOIN "loads" AS "l" ON "la"."load_id" = "l"."id"
    `;
    pool.query(queryText)
      .then(result => res.json(result.rows))
      .catch((err) => {
        console.log('Error fetching assigned loads:', err);
        res.sendStatus(500);
      });
});

// Route to fetch all available loads
router.get('/loads', rejectUnauthenticated, (req, res) => {
    const queryText = `
      SELECT "id", "description", "pickup_location", "dropoff_location" 
      FROM "loads"
    `;
    pool.query(queryText)
      .then(result => res.json(result.rows))
      .catch((err) => {
        console.log('Error fetching loads:', err);
        res.sendStatus(500);
      });
});

// Route to log driving information
router.post('/driving-log', rejectUnauthenticated, (req, res) => {
    const { location, start_time, end_time } = req.body;

    const queryText = `INSERT INTO "driving_logs" ("location", "start_time", "end_time") 
                       VALUES ($1, $2, $3) RETURNING "id"
    `;

    pool.query(queryText, [location, start_time, end_time])
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log('Error saving driving log:', err);
        res.sendStatus(500);
    });
});

// Route to fetch all driving logs
router.get('/driving-log', rejectUnauthenticated, (req, res) => {
    const queryText = `
      SELECT "id", "location", "start_time", "end_time" 
      FROM "driving_logs"
    `;
    pool.query(queryText)
      .then(result => res.json(result.rows))
      .catch((err) => {
        console.log('Error fetching driving logs:', err);
        res.sendStatus(500);
      });
});

module.exports = router;
