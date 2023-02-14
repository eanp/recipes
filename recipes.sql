CREATE TABLE users(id SERIAL, name VARCHAR);

INSERT INTO users(name) VALUES('yosua');

 SELECT * FROM users;

 UPDATE users SET name='fauzan' WHERE name='basri';

 DELETE FROM users WHERE name='fauzan';

 SELECT * FROM users WHERE name='yosua';
 
 CREATE TABLE users(
    id SERIAL, 
    name VARCHAR
    );
ALTER TABLE users add PRIMARY KEY(id);

CREATE TABLE recipes(
    id SERIAL,
    title VARCHAR NOT NULL,
    ingredients TEXT NOT NULL,
    photo VARCHAR,
    created_at TIMESTAMP NOT NULL,
    users_id INT REFERENCES users(id)
);

 SELECT * FROM recipes;

INSERT INTO recipes(ingredients,title,photo,users_id,created_at) VALUES('telur','telur goreng','http://localhost',4,'2023-02-14 14:58:23');

CREATE TABLE category(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL
);

INSERT INTO category(name) VALUES('main course');

ALTER TABLE recipes add category_id INT;

ALTER TABLE recipes add Foreign Key (category_id) REFERENCES category(id);

ALTER TABLE recipes add slug VARCHAR;
