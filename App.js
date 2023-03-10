/**
 * import node modules needed
 */
import { createJournalTable } from "./db/functions.js";
import express from "express";
import { router } from "./routes/index.js";
import cors from "cors";

/**
 * initialize a new express server
 */
const app = express();

//Convert incoming files to JSON
app.use(express.json());

// Cors middleware
app.use(cors("*"));

//App.use(json.parse());
app.use("/users", router);

const PORT = process.env.PORT;

/**
 * set app to listen to port 3001
 */
app.listen(PORT, function () {
  console.log(`Server is listening to port ${PORT}.`);
});

export default app;
