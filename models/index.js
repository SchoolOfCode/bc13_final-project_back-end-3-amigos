/**
 * import pool from db folder index.js
 */
import { response } from "express";
import { pool } from "../db/index.js";

// POST add new user
export async function addNewUsers(users) {
  const res = await pool.query(
    `INSERT INTO users (username, email, password, uid) VALUES ($1, $2, $3, $4) RETURNING*;`,
    [users.username, users.email, users.password, users.uid]
  );
  return res.rows;
}

export async function getUser(uid) {
  const res = await pool.query(
    `SELECT username, email, password, uid from users where uid=$1;`,
    [uid]
  );

  return res.rows;
}

export async function deleteUser(uid) {
  const res = await pool.query(`DELETE FROM users where uid=$1;`, [uid]);

  return res.rows;
}

export async function getUsers() {
  const res = await pool.query(
    `SELECT username, email, password, uid from users;`
  );
  return res.rows;
}

export async function getFavouritesByUid(uid) {
  // use pool.query to open database connection

  const res = await pool.query(
    // use the inner join to select user's favourite places by uid
    // used the $1 to secure the uid
    `SELECT uid, xid, title, city, country, suburb, description, image FROM user_favourites where uid=$1`,
    [uid]
  );
  return res.rows;
}

export async function deleteFavouritesByUid(uid) {
  // use pool.query to open database connection

  const res = await pool.query(
    // use the inner join to select user's favourite places by uid
    // used the $1 to secure the uid
    `DELETE FROM user_favourites where uid=$1`,
    [uid]
  );
  return res.rows;
}

// POST- add new user favourite to database
export async function addFavourite(uid, favourite) {
  const res = await pool.query(
    `INSERT INTO user_favourites (uid, xid, title, city, country, suburb, description, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING*;`,
    [
      uid,
      favourite.xid,
      favourite.title,
      favourite.city,
      favourite.country,
      favourite.suburb,
      favourite.description,
      favourite.image,
    ]
  );
  return res.rows;
}

export async function getFavouriteByUidXid(uid, xid) {
  const res = await pool.query(
    `SELECT  uid, xid, title, city, country, suburb, description, image FROM user_favourites WHERE uid = $1 AND xid = $2;`,
    [uid, xid]
  );
  return res.rows;
}

//DELETE - location by xid AND uid, which comes through as an object from the front end
export async function deleteFavouriteByUidXid(uid, xid) {
  const res = await pool.query(
    `DELETE FROM user_favourites WHERE uid = $1 AND xid = $2 RETURNING*;`,
    [uid, xid]
  );
  return res.rows;
}
