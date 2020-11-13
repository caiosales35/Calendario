const connection = require('../database/connection');
const { index } = require('./UserController');

module.exports = {
    async index(request, response) {
        const events = await connection('events').select('*');
        return response.json(events);
    },

    async create(request, response) {
        const { title, description, start, end } = request.body;
        const user_id = request.headers.authorization;

        const event = await connection('events')
            .where('user_id', user_id)
            .where('start', start)
            .where('end', end)
            .select('*');
        
        if (!event.length) {
            const [id] = await connection('events').insert({
                title,
                description,
                start,
                end,
                user_id
            });
            return response.json({id});    
        }
        return response.status(400).json({error: 'Já existe evento no horário selecionado!'});
        
    }
};