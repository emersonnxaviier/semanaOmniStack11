const connection = require('../database/connection'); //importando conexao com o banco de dados.

module.exports = {

async index(request, response){ //ira retornar casos especificos de uma unica ong.
 //e acessa os dados da ong que esta logada.
const ong_id = request.headers.authorization;

const incidents = await connection('incidents')
    .where('ong_id', ong_id)
    .select('*');

return response.json(incidents);
}

};