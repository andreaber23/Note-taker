const express = require("express");
const fs = require('fs');
const path = require('path');
const notesData = require("./db/db.json")
const PORT = process.env.PORT || 3001;
const app = express();
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

// HTML route `GET /notes` should return the `notes.html` file.
app.get("/notes", (req,res)=>{
    res.sendFile(path.join(__dirname, "/public/index.html"))
});

//HTML route `GET *` should return the `index.html` file.
app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname, "/public/index.html"))
});

app.get("*", (req,res)=>{
    res.sendFile(path.join(__dirname, "./public/index.html "))
});




// `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client

app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;

    if (!title || !text) {
        return res.status(400).json({ error: 'Title and text are required.' });
    }

    const noteEntry = {
        id: uuidv4(),
        title,
        text
    };

    notesData.push(noteEntry);
    saveNotesData();

    res.json(noteEntry);
});

function saveNotesData() {
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesData, null, 2)
    );
};
//`GET /api/notes` should read the `db.json` file and return all saved notes as JSON
app.get('/api/notes', (req, res) => {
    res.json(notesData);
});

app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;

    const noteIndex = notesData.findIndex(note => note.id === noteId);

    if (noteIndex !== -1) {
        notesData.splice(noteIndex, 1);
        saveNotesData();

        res.json({ message: 'Note deleted.' });
    } else {
        res.status(404).json({ error: 'Note could not be found.' });
    }
});


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });
