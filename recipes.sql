CREATE TABLE users(id SERIAL, name VARCHAR);

INSERT INTO users(name) VALUES('yosua');

 SELECT * FROM users;

 UPDATE users SET name='fauzan' WHERE name='basri';

 DELETE FROM users WHERE name='bayu';

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
INSERT INTO recipes(ingredients,title,photo,users_id,created_at) VALUES('telur','telur goreng','http://localhost',4,'to_timestamp(${Date.now()} / 1000.0)');

CREATE TABLE category(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL
);

INSERT INTO category(name) VALUES('main course');

ALTER TABLE recipes add category_id INT;

ALTER TABLE recipes add Foreign Key (category_id) REFERENCES category(id);

ALTER TABLE recipes add slug VARCHAR;


DELETE FROM users WHERE id=3;

SELECT * FROM recipes;
SELECT * FROM recipes WHERE deleted_at IS NULL;
SELECT * FROM recipes JOIN category ON recipes.category_id=category.id JOIN users ON users_id=users.id;

-- data biasa
SELECT recipes.title,recipes.ingredients,recipes.created_at as posttime, users.name as creator, category.name as category FROM recipes JOIN category ON recipes.category_id=category.id JOIN users ON users_id=users.id WHERE recipes.deleted_at IS NULL AND recipes.title ILIKE '%goreng%'  ORDER BY recipes.created_at DESC ;

-- 
SELECT recipes.title,recipes.ingredients,recipes.created_at as posttime, users.name as creator, category.name as category FROM recipes JOIN category ON recipes.category_id=category.id JOIN users ON users_id=users.id WHERE recipes.title ILIKE '%goreng%' AND recipes.deleted_at IS NOT NULL ORDER BY recipes.created_at DESC ;

ALTER TABLE recipes add deleted_at TIMESTAMP DEFAULT NULL;

 UPDATE recipes SET deleted_at='2023-02-14 14:58:23' WHERE id=1;

SELECT * FROM recipes LIMIT 2;

CREATE TABLE users(
    id VARCHAR PRIMARY KEY,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    fullname VARCHAR,
    photo VARCHAR,
    verif INT DEFAULT 0,
    OTP VARCHAR,
    created_at TIMESTAMP
);

INSERT INTO users(id,email,password,fullname) VALUES('1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed','ean@ean.id','123','ean');

SELECT * FROM users WHERE email='ean@ean.id';