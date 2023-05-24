const express = require('express');
const mongoose = require('mongoose');
const { config } = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const userRouter = require('./routes/user');
const scholarRouter = require('./routes/scholar');
const HttpError = require('./models/httpError');
const getAccessTokenRouter = require('./routes/getAccessToken');
const gradesRouter = require('./routes/grades');
const updatesRouter = require('./routes/updates');
const widgetsRouter = require('./routes/widgets');

config();

const app = express();

const port = process.env.PORT || 8080;
const dbUri = process.env.DB_URI;

// Middlewares
app.use(helmet());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes for endpoints
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/user', userRouter);
app.use('/scholar', scholarRouter);
app.use('/getAccessToken', getAccessTokenRouter);
app.use('/grades', gradesRouter);
app.use('/updates', updatesRouter);
app.use('/widgets', widgetsRouter);

// Handling unknown routes
app.use((req, res, next) => {
  return next(new HttpError('Route not found', 404));
});

// Error handling
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  // If no header was sent, error exists
  res
    .status(error.code || 500)
    .json({ message: error.message || 'Unknown Error' });
});

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
