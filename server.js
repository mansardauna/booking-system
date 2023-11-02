const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3003;

// Enable CORS
app.use(cors());

// Serve static files (e.g., your JSON database file)
app.use(express.static(path.join(__dirname, 'public')));

// Read and parse your JSON database file
const dbFilePath = path.join(__dirname, 'db.json');
const db = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));

// Define a route to get all products
app.get('/api/products', (req, res) => {
  console.log('Received GET request for products');
  res.json(db.products);
});

// Define a route to get a specific product by ID
app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const product = db.products.find((p) => p.id === parseInt(id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Define a route to add a new product
app.post('/api/products', (req, res) => {
  const newProduct = req.body;
  newProduct.id = Date.now();
  db.products.push(newProduct);

  fs.writeFileSync(dbFilePath, JSON.stringify(db, null, 2));

  res.status(201).json(newProduct);
});

app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});
