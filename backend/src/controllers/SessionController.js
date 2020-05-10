const connection = require('../database/connection'); //importando conexao com o banco de dados.

module.exports = {
                            //resolver problema
async create(request, response){
    const { id } = request.body;

    const ong = await connection('ongs')
        .where('id', id)
        .select('name')
        .first();

        if (!ong) {
            return response.status(400).json({erro:'nenhuma ong encontrada com esse id!'});
        }
    return response.json(ong);
    }  
}