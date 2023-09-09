// Im port module dependencies
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

function writeDataToFile(data) {
  fs.writeFileSync(notesData, JSON.stringify(data, null, 2));
}

// Route handler for the '/notes' GET request
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// Route handler for the root '/' GET request
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



// Open PORT server 
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});