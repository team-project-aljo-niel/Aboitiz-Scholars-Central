const express = require('express');
const mongoose = require('mongoose');
const { config } = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');

config();

const app = express();

const port = process.env.PORT || 8080;
const dbUri = process.env.DB_URI;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(dbUri)
  .then(() => {
    console.log('Connected to Database');
  })
  .catch((error) => {
    console.log(error, 'Could not connect to database');
  });

app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});
