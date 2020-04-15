brew services start postgresql
psql -d postgres -U me
-- https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/

CREATE DATABASE cafe_api;

\c cafe_api

CREATE TABLE cafe (
  id SERIAL PRIMARY KEY NOT NULL,
  cafeName VARCHAR(30),
  location VARCHAR(30),
  --owner VARCHAR(30), --Eventually this should be FOREIGN KEY to users table
  capacity INT,
  isPrivate BOOLEAN,
  created_TIMESTAMP TIMESTAMPTZ DEFAULT Now()
);

INSERT INTO cafe (cafeName, location, capacity, isPrivate)
  VALUES ('Hogwarts', 'United Kingdom', 10, TRUE), 
  		('Stumptown', 'Seattle, WA', 13, FALSE);

SELECT * FROM cafe;

DELETE FROM cafe;



heroku pg:psql postgresql-round-54332 --app virtualcoffeeshop;
cat init.sql | heroku pg:psql postgresql-round-54332 --app virtualcoffeeshop




git subtree push --prefix api heroku master



