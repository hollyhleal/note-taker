// Import express
const express = require("express");

// Import our modular routers for /notes
const notesRouter = require("./notes");

// Create app variable to store the value of express()
const app = express();

//http://localhost:3001/api/notes
app.use("/notes", notesRouter);

// Export app
module.exports = app;
