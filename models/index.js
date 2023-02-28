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

// GET specific user info
export async function getUser(uid) {
  const res = await pool.query(
    `SELECT username, email, password, uid from users where uid=$1;`,
    [uid]
  );

  return res.rows;
}

// DELETE specific user by uid
export async function deleteUser(uid) {
  const res = await pool.query(`DELETE FROM users where uid=$1;`, [uid]);

  return res.rows;
}

// GET all users
export async function getUsers() {
  const res = await pool.query(
    `SELECT username, email, password, uid from users;`
  );
  return res.rows;
}

// GET all user favourites
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

// Delete all user favourites by UID
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

// POST new user favourite
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

// GET specific user favourite
export async function getFavouriteByUidXid(uid, xid) {
  const res = await pool.query(
    `SELECT  uid, xid, title, city, country, suburb, description, image FROM user_favourites WHERE uid = $1 AND xid = $2;`,
    [uid, xid]
  );
  return res.rows;
}

//DELETE specific user favourite
export async function deleteFavouriteByUidXid(uid, xid) {
  const res = await pool.query(
    `DELETE FROM user_favourites WHERE uid = $1 AND xid = $2 RETURNING*;`,
    [uid, xid]
  );
  return res.rows;
}

// POST new journal entry

export async function postJournalEntry(uid, data) {
  const res = await pool.query(
    `INSERT INTO journal(uid, title, location, text, date  ) VALUES($1, $2, $3, $4, $5) RETURNING*; `,
    [uid, data.title, data.location, data.text, data.date]
  );
  return res.rows;
}

// GET journal entries

export async function getJournalEntriesByUid(uid) {
  const res = await pool.query(`SELECT* FROM journal WHERE uid = $1`, [uid]);
  return res.rows;
}

// DELETE ALL journal entry
export async function deleteAllJournalEntriesByUid(uid) {
  const res = await pool.query(`DELETE FROM journal WHERE uid = $1 `, [uid]);
  return res.rows;
}

// DELETE ONE journal entry by uid and id
export async function deleteJournalEntryById(uid, id) {
  const res = await pool.query(
    `DELETE FROM journal WHERE uid = $1 AND id = $2 RETURNING *`,
    [uid, id]
  );
  return res.rows;
}

// PATCH journal entry by UID, ID and Body(data object)
export async function patchJournalEntryById(uid, id, data) {
  const res = await pool.query(
    `UPDATE journal SET title = $1, location = $2, text = $3, date = $4 WHERE uid = $5 AND id = $6 RETURNING *`,
    [data.title, data.location, data.text, data.date, uid, id]
  );
  return res.rows;
}
