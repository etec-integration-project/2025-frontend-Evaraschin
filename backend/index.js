const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Conexión a MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

connection.connect((err) => {
  if (err) {
    console.error('Error conectando a MySQL:', err);
    return;
  }
  console.log('Conectado a MySQL!');
});

// Ejemplo de ruta para obtener todos los items
app.get('/api/items', (req, res) => {
  connection.query('SELECT * FROM items', (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
});

// Ejemplo de ruta para crear un item
app.post('/api/items', (req, res) => {
  const { nombre, descripcion } = req.body;
  connection.query(
    'INSERT INTO items (nombre, descripcion) VALUES (?, ?)',
    [nombre, descripcion],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.status(201).json({ id: results.insertId });
    }
  );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
}); 