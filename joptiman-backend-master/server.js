const express = require('express');
const db = require('./db');
const dotenv = require('dotenv');
const path = require('path');
const productRoutes = require('./routes/productRoutes');

dotenv.config();
db();

const app = express();
app.use(express.json());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/products', productRoutes);

// Middleware to set headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", 'true');
    next();
});

// Default route
app.get('/', (req, res) => {
    res.send('API is running');
});

// Server listening
const PORT = process.env.PORT || 5008;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
