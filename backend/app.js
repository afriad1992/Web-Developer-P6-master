const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('./database');
const path = require('path');
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  app.use(express.urlencoded({ extended : false }));
  app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.urlencoded({ extended : false }));
app.use(express.json());
const user=require('./routes/user.routes');
const sauce=require('./routes/sauce.routes');
app.use(express.urlencoded({ extended : false }));
app.use(express.json());
app.use("/api/auth", user);
app.use("/api/sauces", sauce);

module.exports = app; 