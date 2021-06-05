const express = require('express');

const routes = express.Router();

const {index, show, create, update, updateEstatus, destroy} = require('../controllers/ticketsController');

routes.get('/tickets', index);

routes.get('/tickets/:id', show);

routes.post('/tickets', create);

routes.put('/tickets/:id', update);

routes.put('/tickets/estatus/:id', updateEstatus);

routes.delete('/tickets/:id', destroy);

module.exports = routes;