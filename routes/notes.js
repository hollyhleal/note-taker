// Router is a class constructor that returns a router object
const notes = require("express").Router();

// Import helper functions and dependencies
const { v4: uuidv4 } = require("uuid");
const { readAndAppend, readFromFile } = require("../helpers/fsUtils");

// GET /api/notes should read the db.json file and return all saved notes as JSON
notes.get("/", (req, res) =>
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)))
);

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. Each note gets a unique id when it's saved.
notes.post("/", (req, res) => {
  // Log that the POST request was received
  console.info(`${req.method} request received to post a new note.`);
  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      id: uuidv4(),
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

// TO DO: DELETE /api/notes/:id should receive a query parameter that contains the id of a note to delete. To delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.
// DELETE /api/notes/${id} should delete the clicked note
// notes.delete("/notes/:id", (req, res) => {
//   // read JSON file - var toDelete = fs.readFile()
//   var toDelete = JSON.parse(readFromFile("./db/db.json").toString());
//   toDelete = toDelete.filter(function (note) {
//     if (note.id === req.params.id) {
//       res.json(handleNoteDelete(id));
//     } else if (error) {
//       throw error;
//     }
//   });
// });

module.exports = notes;
