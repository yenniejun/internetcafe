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