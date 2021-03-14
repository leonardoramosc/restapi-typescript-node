CREATE DATABASE typeapi;

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(40),
  email TEXT
);

INSERT INTO users (name, email)
  VALUES ('joe', 'joe@gm.com'),
         ('leo', 'leo@gmail.com');