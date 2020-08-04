DROP DATABASE IF EXISTS cta_reddit_db;
CREATE DATABASE cta_reddit_db;

\c cta_reddit_db;

DROP TABLE IF EXISTS subreddits;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS votes;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id VARCHAR UNIQUE NOT NULL PRIMARY KEY,
    user_name VARCHAR,
    email VARCHAR UNIQUE,
    password VARCHAR
);

CREATE TABLE subreddits(
    id SERIAL PRIMARY KEY,
    user_id VARCHAR REFERENCES users(id) ON DELETE CASCADE,
    subname VARCHAR
);

CREATE TABLE posts(
    id SERIAL PRIMARY KEY,
    user_id VARCHAR REFERENCES users(id) ON DELETE CASCADE,
    sub_id INTEGER REFERENCES subreddits(id) ON DELETE CASCADE,
    title VARCHAR,
    body VARCHAR,
    image VARCHAR
);

CREATE TABLE votes(
      id SERIAL PRIMARY KEY,
      user_id VARCHAR REFERENCES users(id) ON DELETE CASCADE,
      post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE
);