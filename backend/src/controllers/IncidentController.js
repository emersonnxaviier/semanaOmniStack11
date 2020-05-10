
const connection = require('../database/connection'); //importando conexao com o banco de dados.

module.exports = {

//listar                          //resolver problema da paginacao
async index(request, response){ 

    const [count] = await connection('incidents').count();   //buscar total de cadastros.
    

    //const {page = 0} = resquest.query;
    const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')  //mostra os dados da ong e os incidents relacionados a ela.
      //  .limit(5)
        //.offset((page-1)* 5)
        .select('incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp','ongs.city', 'ongs.uf');  //mostra todos os campos de casos e alguns de ongs.

       // response.headers('X-Total-Count', count['count(*)']);  //mostrar o total de cadastros no front-end

        return response.json(incidents);         
    },

//criar
async create(request, response){

    const {title, description, value} = request.body;
    const ong_id = request.headers.authorization; //acessar o id da ong.

    const [id] = await connection('incidents').insert({  //para receber o id de registro no banco de dados / inserir valores na tabela.
        title,
        description,
        value,
        ong_id,
       });
    
return response.json({id});

}, 
//deletar
async delete(request, response){
const {id} = request.params; //pega o id que vem do parametro da rota.
const ong_id = request.headers.authorization;  //pega o id da ong logada.

const incidents = await connection('incidents')
    .where('id', id) //encontar na coluna id um que seja igual ao id do parametro.
    .select('ong_id') //selecionar apenas a coluna ong_id.
    .first(); //pois ira retornar apenas um resultado.

    //se na tabela incidents o id da ong que cadastrou um caso for diferente da ong que deseja apagar emitira essa mensagem de erro.
if(incidents.ong_id != ong_id){
    return response.status(401).json({erro:'Operação não Permitida!'}); // status 401 é quando a acao nao é permitida.
}
    //se os IDs forem iguais ira deletar.
await connection('incidents').where('id', id).delete();

return response.status(204).send(); //status 204 é quando a resposta deu sucesso mas nao tem conteudo para retornar e o send é só pra enviar a resposta sem corpo nenhum.
}

};