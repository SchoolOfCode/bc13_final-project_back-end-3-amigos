/**
 * import express
 * import index.js from models
 * import router from express
 */

import express from "express";
import { getFavouritesByUserId } from "../models/index.js";

const router = express.Router();

router.get("/:id", async function (req, res) {
  const response = await getFavouritesByUserId(req.params.id);
  res.status(200).json({
    success: true,
    payload: response,
  });
});

export { router };
