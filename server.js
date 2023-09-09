const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const uuid = require('uuid');

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const notesData = path.join(__dirname, 'db', 'db.json');

function readDataFromDb() {
  const data = fs.readFileSync(notesData, 'utf-8');
  return JSON.parse(data);
}

function writeDataToDb(data) {
  fs.writeFileSync(notesData, JSON.stringify(data, null, 2));
}

// GET request for '/notes' 
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

//ET request for root '/' G
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// GET request for '/api/notes' 
app.get('/api/notes', (req, res) => {
  const noteData = readDataFromDb();
  console.log('GET /api/notes', noteData);
  res.json(noteData);
});

// POST request for '/api/notes' 
app.post('/api/notes', (req, res) => {
  const { title, text } = req.body;
  if (title && text) {
    const noteEntry = {
      title: title,
      text: text,
      id: uuid.v4(),
    };

    const noteData = readDataFromDb();
    noteData.push(noteEntry);
    writeDataToDb(noteData);

    const action = {
      status: 'success',
      body: noteEntry,
    };
    console.log('POST /api/notes', action);
    res.status(201).json(action);
  } else {
    res.status(500).json('Error posting');
  }
});

// DELETE request '/api/notes/:id' 
app.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;
  const noteData = readDataFromDb();
  const dataUpdated = noteData.filter((note) => note.id !== noteId);
  writeDataToDb(dataUpdated);

  const action = {
    status: 'success',
    body: dataUpdated,
  };
  console.log('DELETE /api/notes/:id', action);
  res.status(200).json(action);
});

// Open PORT server 
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});