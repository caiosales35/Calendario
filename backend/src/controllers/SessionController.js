const { response } = require('express');
const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { id } = request.body;
        const user = await connection('users').where('id', id).select('name').first();

        if (!user) {
            return response.status(400).json({error: 'Nenhum usuario encontrado!'});
        }
        return response.json(user);
    }
};