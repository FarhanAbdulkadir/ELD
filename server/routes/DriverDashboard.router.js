const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


// route to post the driver info 
router.post('/', (req, res)=>{
    const { location, start_time, end_time, user_id } = req.body;
    console.log('req.body', req.body.location);

    const queryText = `INSERT INTO "driverInfo" ("location", "start_time", "end_time", "user_id") 
                            VALUES ($1, $2, $3, $4) RETURNING id
    `;

    console.log("query text", queryText);

    pool.query(queryText, [location, start_time, end_time, user_id]) 
    .then(() => res.sendStatus(201)) 
    .catch((err) => { 
        console.log('Error saving driving log:', err); 
        res.sendStatus(500);
     }); 
    
    
});


// route for inspection 
router.post('/inspection', (req, res)=>{
    const {brakes, tires, lights, fluids, electrical_systems, wipers} = req.body;

    const queryText = ` INSERT INTO "inspection" ("brakes", "tires", "lights", "fluids", "electrical_systems", "wipers") 
                                VALUES ($1, $2, $3, $4, $5, $6);
    
            `
    pool.query(queryText, [brakes, tires, lights, fluids, electrical_systems, wipers])
        .then(()=> res.sendStatus(201))
        .catch((err)=>{
            console.log('error saving driving log: err', err);
            res.sendStatus(500)
        })
})

// fetch the driver info 

router.get('/', (req, res)=>{
    

    const queryText = `SELECT * FROM "driverInfo" `;

    pool.query(queryText) 
    .then(result => res.status(200).send(result.rows)) 
    .catch((err) => { 
        console.log('Error fetching driving logs:', err); 
        res.sendStatus(500);
     }); 
    
    
});


// fetching inspection 

router.get('/inspection', (req, res)=>{

    const queryText = ` SELECT * FROM "inspection"; `

    pool.query(queryText)
        .then(result => res.status(200).send(result.rows))
        .catch((err)=>{
            console.log('error getting the inspection', err);
            res.sendStatus(500);
        })
})




module.exports = router
