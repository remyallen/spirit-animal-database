CREATE TABLE animal (
animal_id SERIAL PRIMARY KEY,
animal_name varchar(60),
animal_color varchar(60)
);

CREATE TABLE people (
person_id SERIAL PRIMARY KEY,
first_name varchar(60),
last_name varchar(60),
animal_id INTEGER REFERENCES animal (animal_id)
);



