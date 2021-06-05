const express = require('express');

const routes = express.Router();

const {index, show, create, destroy} = require('../controllers/personasController');

routes.get('/personas', index);

routes.get('/personas/:id', show);

routes.post('/personas', create);

routes.delete('/personas/:id', destroy);

module.exports = routes;