/**
 * import node modules needed
 */

import express from "express";
import { createUserTable, createUserFavouritesTable } from "./db/functions.js";
import { router } from "./routes/index.js";
import cors from "cors"

/**
 * initialize a new express server
 */
const app = express();

//Convert incoming files to JSON 
app.use(express.json());

// Cors middleware 
app.use(cors("*"));

//App.use(json.parse());
app.use("/userfavourites", router);

const PORT = process.env.PORT;

/**
 * set app to listen to port 3001
 */
app.listen(PORT, function () {
  console.log(`Server is listening to port ${PORT}.`);
});
