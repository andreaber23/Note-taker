const express = require("express");
const fs = require('fs');
const path = require('path');
const notesData = require("./db/db.json")

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

// HTML route `GET /notes` should return the `notes.html` file.
app.get("/notes", (req,res)=>{
    res.sendFile(path.join(__dirname, "./public/notes.html "))
});

//HTML route `GET *` should return the `index.html` file.
app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname, "./public/notes.html "))
});

app.get("*", (req,res)=>{
    res.sendFile(path.join(__dirname, "./public/index.html "))
});

//`GET /api/notes` should read the `db.json` file and return all saved notes as JSON

app.get('/api/notes', (req, res) => {
      res.json(notesData);
});


module.exports = app;


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });
