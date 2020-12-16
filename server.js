const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const usersRoutes = require('./server/routes/users');
const authRoutes = require('./server/routes/auth');
const challengesRoutes = require('./server/routes/challenges');
const {dbUser, dbUserPassword, dbName} = require('./server/config/database');
const {port} = require('./server/config/config');

mongoose.connect(`mongodb+srv://${dbUser}:${dbUserPassword}@cluster0.lfsvz.mongodb.net/${dbName}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const logs = [];
const logMiddleware = (req, res, next) => {
  const date = new Date();
  const method = req.method;
  const url = req.url;
  const log = {
    date,
    method,
    url
  };
  logs.push(log);
  next();
};

const app = express();
app.use(express.json());

const authMiddleware = require('./server/middlewares/authMiddleware');

app.use(logMiddleware);

app.use('/api/auth', authRoutes);

app.use('/api/users', authMiddleware, usersRoutes);
app.use('/api/challenges', authMiddleware, challengesRoutes);

app.use(express.static(__dirname + '/build'));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.use((err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
    res.status(400).json({message: err.error.toString()});
  } else {
    next(err);
  }
});

app.listen(port, () => {
    console.log(`Server has been started on ${port} port`)
});