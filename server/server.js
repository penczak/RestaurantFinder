require("dotenv").config();
const express = require("express");
const db = require("./db");
const app = express();
const cors = require("cors");

//Middleware - Create res.body

app.use(express.json());

app.use(cors());

//-----ROUTE HANDLER-----

//Get all restaurants
app.get("/api/v1/", async (req, res) => {
    try {
        const results = await db.query("SELECT * FROM restaurants");
        //console.log(results);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                restaurants: results.rows
            },

        });
    } catch (err) {
        console.log(err);
    }
});

//Get one restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const results_restaurant = await db.query("SELECT * FROM restaurants WHERE id = $1", [req.params.id]);
        const results_reviews = await db.query("SELECT * FROM reviews WHERE restaurant_id = $1", [req.params.id]);
        res.status(200).json({
            status: "success",
            data: {
                restaurants: results_restaurant.rows[0], //Is it bad to return just the 0th entry? Seems like a bad practice. 
                reviews: results_reviews.rows,
            },
        });
        //console.log(results_reviews.rows);
    } catch (err) {
        console.log(err);
    }
});

//Create a restaurant
app.post("/api/v1/", async (req, res) => {
    //console.log(req.body);
    try {
        const results = await db.query(
            "INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *;",
            [req.body.name, req.body.location, req.body.price_range]
        );
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                restaurants: results.rows[0]
            },
        });
    } catch (err) {
        console.log(err);
    }
});

//Update a restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
    //console.log(req.body);
    
    try {
        const results = await db.query(
            "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *;",
            [req.body.name, req.body.location, req.body.price_range, req.params.id]
        );
        //console.log(results);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                restaurants: results.rows[0]
            },
        });
    } catch (err) {
        console.log(err);
    }
});

//Delete a restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const results = await db.query(
            "DELETE FROM restaurants WHERE id = $1;",
            [req.params.id]
        );
        res.status(204).json({
            status: "success",
        });
    } catch (err) {
        console.log(err);
    }
});

//Add a review
app.post("/api/v1/restaurants/:id/review", async (req, res) => {
    //console.log("Post a review called");
    try {
        const results = await db.query(
            "INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) RETURNING *;",
            [req.body.restaurant_id, req.body.name, req.body.review, req.body.rating]
        );
        res.status(200).json({
            status: "success",
        });
    } catch (err) {
        console.log(err);
    }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is up. Listening on port ${port}.`);
});