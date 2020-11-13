const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
        async create(request, response) {
        const { name, email } = request.body;
        const id = crypto.randomBytes(3).toString('HEX');
        await connection('users').insert({id, name, email});
        return response.json({id});
    }
};