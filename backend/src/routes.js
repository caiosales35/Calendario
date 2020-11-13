const express = require('express');
const routes = express.Router();

const UserController = require('./controllers/UserController');
const EventsController = require('./controllers/EventsController');



routes.get('/users', UserController.index);
routes.post('/users', UserController.create);

routes.get('/events', EventsController.index);
routes.post('/events', EventsController.create);
routes.delete('/events/:id', EventsController.delete);

module.exports = routes;