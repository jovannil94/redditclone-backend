DROP DATABASE IF EXISTS cta_reddit_db;
CREATE DATABASE cta_reddit_db;

\c cta_reddit_db;

DROP TABLE IF EXISTS votes;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS subreddits;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL UNIQUE NOT NULL PRIMARY KEY,
    user_name VARCHAR,
    email VARCHAR UNIQUE
);

CREATE TABLE subreddits(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    subname VARCHAR UNIQUE
);

CREATE TABLE posts(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    sub_id INTEGER REFERENCES subreddits(id) ON DELETE CASCADE,
    title VARCHAR,
    body VARCHAR,
    image VARCHAR,
    comments VARCHAR
);

CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    body VARCHAR,
    comment_date TIMESTAMP DEFAULT NOW()
);

CREATE TABLE votes(
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
      comment_id INTEGER REFERENCES comments(id) ON DELETE CASCADE,
      vote_type VARCHAR
);