const { level } = require("winston");
const Note = require("../models/note.model");
const logger = require("../controllers/logger");
const {
  createNewNote,
  findAllNotes,
  findNote,
  updateNote,
  deleteById,
} = require("../services/service");
// Create and Save a new Note
exports.create = (req, res) => {
  // Validate request
  if (!req.body.content) {
    logger.customLogger.log("error", "Note content can not be empty.");
    return res.status(400).send({
      message: "Note content can not be empty.",
    });
  }
  // Create a Note
  const note = new Note({
    title: req.body.title || "Untitled Note",
    content: req.body.content,
  });
  // Save Note in the database
  note
    .save()
    .then((data) => {
      logger.customLogger.log("info", "Note created and saved.");
      res.send(data);
    })
    .catch((err) => {
      logger.customLogger.log(
        "error",
        "Some error occurred while creating the Note."
      );
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Note.",
      });
    });
};
// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
  findAllNotes()
    .then((notes) => {
      logger.customLogger.log("info", "Returned all notes from the datatbase.");
      res.send(notes);
    })
    .catch((err) => {
      logger.customLogger.log(
        "error",
        "Some error occurred while creating the Note."
      );
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes.",
      });
    });
};
// Find a single note with a noteId
exports.findOne = (req, res) => {
  findNote(req.params.noteId)
    .then((note) => {
      if (!note) {
        logger.customLogger.log(
          "error",
          "Note not found with id : " + req.params.noteId
        );
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      logger.customLogger.log(
        "info",
        "Note retrieved with id : " + req.params.noteId
      );
      res.send(note);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        logger.customLogger.log(
          "error",
          "Note not found with id : " + req.params.noteId
        );
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      logger.customLogger.log(
        "error",
        "Error retrieving note with id : " + req.params.noteId
      );
      return res.status(500).send({
        message: "Error retrieving note with id " + req.params.noteId,
      });
    });
};
// Update a note identified by the noteId in the request
exports.update = (req, res) => {
  let id = req.params.noteId;
  let title = req.body.title;
  let content = req.body.content;
  updateNote(id, title, content)
    .then((note) => {
      if (!note) {
        logger.customLogger.log(
          "error",
          "Note not found with id : " + req.params.noteId
        );
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      logger.customLogger.log(
        "info",
        "Note updated with id : " + req.params.noteId
      );
      res.send(note);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        logger.customLogger.log(
          "error",
          "Note not found with id :" + req.params.noteId
        );
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      logger.customLogger.log(
        "error",
        "Error updating note with id : " + req.params.noteId
      );
      return res.status(500).send({
        message: "Error updating note with id : " + req.params.noteId,
      });
    });
};
// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
 deleteById(req.params.noteId)
    .then((note) => {
      if (!note) {
        logger.customLogger.log(
          "error",
          "Note not found with id : " + req.params.noteId
        );
        return res.status(404).send({
          message: "Note not found with id : " + req.params.noteId,
        });
      }
      logger.customLogger.log(
        "info",
        "Note with id : " + req.params.noteId + " deleted successfully!"
      );
      res.send({ message: "Note deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        logger.customLogger.log(
          "error",
          "Note not found with id : " + req.params.noteId
        );
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      logger.customLogger.log(
        "error",
        "Could not delete note with id : " + req.params.noteId
      );
      return res.status(500).send({
        message: "Could not delete note with id " + req.params.noteId,
      });
    });
};
