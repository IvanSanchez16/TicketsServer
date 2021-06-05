const express = require('express');

const routes = express.Router();

const {index, show, create, destroy} = require('../controllers/categoriasController');

routes.get('/categorias', index);

routes.get('/categorias/:id', show);

routes.post('/categorias', create);

routes.delete('/categorias/:id', destroy);

module.exports = routes;