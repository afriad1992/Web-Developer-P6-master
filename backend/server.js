
const http = require('http');
const app = require('./app');
const express = require('express');
const router = express.Router();

const server = http.createServer(app);

server.listen(process.env.PORT || 3000);

