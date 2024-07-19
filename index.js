const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const router = require('./router/router'); // Assuming this contains your CRUD routes
// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS
app.use(cors());

// Connect to MongoDB
const mongoURI = 'mongodb://localhost:27017/claims-management';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Mount the router at '/api'
app.use('/api', router);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
