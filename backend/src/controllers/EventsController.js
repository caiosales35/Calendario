const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const user_id = request.headers.authorization;
        const { page = 1 } = request.query;

        const [count] = await connection('events').where('user_id', user_id).count();
        const events = await connection('events')
            .where('user_id', user_id)
            .limit(8)
            .offset(8*(page-1))
            .select('*');

        response.header('X-Total-Count', count['count(*)']);
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
    },

    async delete(request, response) {
        const { id } = request.params;
        const user_id = request.headers.authorization;

        const event = await connection('events').where('id', id).select('user_id').first();
        if (event.user_id != user_id) {
            return response.status(401).json({error: 'Operação não permitida!'});
        }
        await connection('events').where('id', id).delete();
        return response.status(204).send();
    },

    async update(request, response) {
        const { id } = request.params;
        const { title, description, start, end } = request.body;
        const user_id = request.headers.authorization;

        const event = await connection('events').where('id', id).select('user_id').first();
        if (event.user_id != user_id) {
            return response.status(401).json({error: 'Operação não permitida!'});
        }

        await connection('events').where('id', id)
            .update({title, description, start, end});

        return response.status(204).send();
    }

};