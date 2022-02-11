
CREATE DATABASE yelp;

-- \c yelp (if not already connected)

CREATE TABLE restaurants (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT  NOT NULL check(price_range >= 1 and price_range <= 5)
);

CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(rating >= 1 and rating <= 5)
);


INSERT INTO reviews (restaurant_id, name, review, rating) VALUES (3, 'Ryan', 'Burritos', 4) RETURNING *;

INSERT INTO restaurants (name, location, price_range) VALUES ('Arbys', 'Houston', 3) RETURNING *;

-- Aggregate functions
https://www.postgresql.org/docs/9.5/functions-aggregate.html
AVG()
COUNT()
MAX()
MIN()
SUM()

SELECT AVG(rating) FROM reviews;

-- TRUNCate to limit number to [arg2] decimals 
SELECT TRUNC(AVG(rating), 1) FROM reviews; 

-- returns "average_review" instead of "trunc" or "avg"
SELECT TRUNC(AVG(rating), 1) AS average_review FROM reviews; 


-- This will work to get the average rating of a particular restaurant
SELECT TRUNC(AVG(rating), 1) AS avg_rating FROM reviews WHERE restaurant_id = $1; 

-- How many ratings does this restaurant have?
SELECT COUNT(rating) FROM reviews WHERE restaurant_id = $1;

-- GROUP BY to return groups
SELECT location, COUNT(location) FROM restaurants GROUP BY location;

SELECT restaurant_id, count(restaurant_id) FROM reviews GROUP BY restaurant_id;

-- JOIN
-- When "id" from restaurant table is the "restaurant_id" from reviews table
-- inner join
SELECT * FROM restaurants INNER JOIN reviews ON restaurants.id = reviews.restaurant_id;
-- this doesnt return all restaurants, only ones with reviews

-- left join
SELECT * FROM restaurants LEFT JOIN reviews ON restaurants.id = reviews.restaurant_id;
-- theres also right join, full outer, etc. read up on this?

SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id; 

SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id WHERE id = $1; 
