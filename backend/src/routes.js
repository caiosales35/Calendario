const express = require('express');
const routes = express.Router();

const UserController = require('./controllers/UserController');
const EventsController = require('./controllers/EventsController');
const SessionController = require('./controllers/SessionController');

routes.get('/session', SessionController.create);

routes.post('/users', UserController.create);

routes.get('/events', EventsController.index);
routes.post('/events', EventsController.create);
routes.put('/events/:id', EventsController.update);
routes.delete('/events/:id', EventsController.delete);

module.exports = routes;