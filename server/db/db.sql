
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


INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ("3", "Ryan", "Burritos", "4") RETURNING *;

INSERT INTO restaurants (name, location, price_range) VALUES ("Arbys", "Houston", "3") RETURNING *;