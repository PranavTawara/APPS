require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const promBundle = require('express-prom-bundle');

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.Mongo_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

app.use(bodyParser.json());
app.use(cors());
app.use(promBundle({ includeMethod: true }));

const { Policyholder, Policy, Claim } = require('./models/models');
const router = require('./router/router');

app.use('/api', router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
