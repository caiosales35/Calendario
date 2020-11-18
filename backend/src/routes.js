const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const routes = express.Router();

const UserController = require('./controllers/UserController');
const EventsController = require('./controllers/EventsController');
const SessionController = require('./controllers/SessionController');

routes.post('/session', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required(),
    })
}), SessionController.create);

routes.post('/users', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
    })
}), UserController.create);

routes.get('/events', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), EventsController.index);

routes.get('/events/:id', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), EventsController.getById);

routes.post('/events', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        start: Joi.string().required(),
        end: Joi.string().required(),
        userId: Joi.string().required(),
    })
}), EventsController.create);

routes.put('/events/:id', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    }),
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        start: Joi.string().required(),
        end: Joi.string().required(),
        userId: Joi.string().required(),
    })
}), EventsController.update);

routes.delete('/events/:id', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), EventsController.delete);

module.exports = routes;