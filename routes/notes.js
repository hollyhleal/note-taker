const notes = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const { readAndAppend, readFromFile } = require("../helpers/fsUtils");

// GET /api/notes should read the db.json file and return all saved notes as JSON
notes.get("/", (req, res) =>
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)))
);

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. Find a way to give each note a unique id when it's saved.
notes.post("/", (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      note_id: uuidv4(),
    };

    readAndAppend(newNote, "./db/db.json");

    const response = {
      status: "success",
      body: newNote,
    };

    res.json(response);
  } else {
    res.json("Error in posting new note.");
  }
});

module.exports = notes;
