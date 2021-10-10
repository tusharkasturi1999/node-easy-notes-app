module.exports = (app) => {
    const notes = require('../controllers/note.controller');
    const express = require('express')
    const router = express.Router() //middleware creates route handler
    const validate = require('../middleware/note.middleware')

    // Create a new Note
    app.post('/notes',validate, notes.create);

    // Retrieve all Notes
    app.get('/notes', notes.findAll);

    app.get('/tushar/:id', (req,res)=>{
        res.send("Hello Tushar"+req.params.id)
    });

    // Retrieve a single Note with noteId
    app.get('/notes/:noteId', notes.findOne);

    // Update a Note with noteId
    app.put('/notes/:noteId',validate, notes.update);

    // Delete a Note with noteId
    app.delete('/notes/:noteId', notes.delete);
}