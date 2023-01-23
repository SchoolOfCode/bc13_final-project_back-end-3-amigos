/**
 * import express
 * import index.js from models
 * import router from express
 */

import express from "express";
import {
  getFavouritesByUid,
  deleteFavouritesByUid,
  getFavouriteByUidXid,
  deleteFavouriteByUidXid,
  addFavourite,
  addNewUsers,
  getUser,
  deleteUser,
  getUsers,
} from "../models/index.js";

const router = express.Router();

router.get("/", async function (req, res) {
  const response = await getUsers();
  res.status(200).json({
    success: true,
    payload: response,
  });
});

// Post user info by UID
router.post("/", async function (req, res) {
  console.log(req.body);

  // check if user exists in database
  if (req.body.uid) {
    const currentUser = await getUser(req.body.uid);
    console.log(`current user: ${currentUser}`);

    // If not, add new user
    if (currentUser.length === 0) {
      const response = await addNewUsers(req.body);
      console.log(response);
      res.status(201).json({
        success: true,
        payload: response,
      });

      // If so return existing user info
    } else {
      res.status(200).json({
        success: true,
        payload: currentUser,
      });
    }
  }
});

// Get user info by UID
router.get("/:uid", async function (req, res) {
  console.log(req.params);
  const response = await getUser(req.params.uid);
  res.status(200).json({
    success: true,
    payload: response,
  });
});

// Delete user by UID
router.delete("/:uid", async function (req, res) {
  const response = await deleteUser(req.params.uid);
  res.status(200).json({
    success: true,
    payload: response,
  });
});

// Get user favourites by uid
router.get("/:uid/favourites", async function (req, res) {
  const response = await getFavouritesByUid(req.params.uid);
  res.status(200).json({
    success: true,
    payload: response,
  });
});

// Post favourites by UID and XID
router.post("/:uid/favourites", async function (req, res) {

  console.log(req.params.uid);
  console.log(req.body);
  if (req.params.uid) {
    const response = await addFavourite(req.params.uid, req.body);
    res.status(200).json({
      success: true,
      payload: response,
    });
  }
});

// Delete all user favourites by UID 
router.delete("/:uid/favourites", async function (req, res) {

  if (req.params.uid) {
    const response = await deleteFavouritesByUid(req.params.uid);
    res.status(200).json({
      success: true,
      payload: response,
    });
  }
});

// Get specific favourites by UID and XID
router.get("/:uid/favourites/:xid", async function (req, res) {
  const response = await getFavouriteByUidXid(req.params.uid, req.params.xid);
  res.status(200).json({
    success: true,
    payload: response,
  });
});

// Delete specific favourite by UID and XID
router.delete("/:uid/favourites/:xid", async function (req, res) {
  const response = await deleteFavouriteByUidXid(
    req.params.uid,
    req.params.xid
  );
  res.status(200).json({
    success: true,
    payload: response,
  });
});

export { router };
