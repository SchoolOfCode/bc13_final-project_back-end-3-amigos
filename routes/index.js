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

// POST: new favourite location AND
// POST: new user
router.post("/", async function (req, res) {
  console.log(req.body);
  // changed username to uid to validate the user.
  if (req.body.uid) {
    const currentUser = await getUser(req.body.uid);
    console.log(`current user: ${currentUser}`);

    if (currentUser.length === 0) {
      const response = await addNewUsers(req.body);
      console.log(response);
      res.status(201).json({
        success: true,
        payload: response,
      });
    } else {
      res.status(200).json({
        success: true,
        payload: currentUser,
      });
    }
  }
});

router.get("/:uid", async function (req, res) {
  console.log(req.params);
  const response = await getUser(req.params.uid);
  res.status(200).json({
    success: true,
    payload: response,
  });
});

router.delete("/:uid", async function (req, res) {
  const response = await deleteUser(req.params.uid);
  res.status(200).json({
    success: true,
    payload: response,
  });
});
// GET: favourites by uid
router.get("/:uid/favourites", async function (req, res) {
  const response = await getFavouritesByUid(req.params.uid);
  res.status(200).json({
    success: true,
    payload: response,
  });
});

router.post("/:uid/favourites", async function (req, res) {
  // changed username to uid to validate the user.
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

router.delete("/:uid/favourites", async function (req, res) {
  // changed username to uid to validate the user.
  if (req.params.uid) {
    const response = await deleteFavouritesByUid(req.params.uid);
    res.status(200).json({
      success: true,
      payload: response,
    });
  }
});

router.get("/:uid/favourites/:xid", async function (req, res) {
  const response = await getFavouriteByUidXid(req.params.uid, req.params.xid);
  res.status(200).json({
    success: true,
    payload: response,
  });
});

// DELETE: by uid and xid, passed through as an object in the body from the front end
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
