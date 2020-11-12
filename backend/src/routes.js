const express = require('express');

const routes = express.Router();

routes.get('/', (request, response) => {
    return response.send('Iniciando API');
});

module.exports = routes;