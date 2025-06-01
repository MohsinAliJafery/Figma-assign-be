const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // default for XAMPP
  database: 'figma_site',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// ✅ Contact Form POST Route
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  const sql = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Database error');
    }
    res.status(200).send('Message saved');
  });
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
