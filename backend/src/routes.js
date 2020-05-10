                  //primeiramente importa o express.
const express = require('express');
const crypto = require('crypto');  //pacote de criptografia, mas que utilizaremos apenas o metodo para gerar strings aleatorias.
const OngController = require('./controllers/OngController'); //importa os metodos para  as ongs.
const IncidentController = require('./controllers/IncidentController'); //importa os metodos para  os incidents.
const ProfileController = require('./controllers/ProfileController'); //importa os metodos para  os incidents.
 const SessionController = require('./controllers/SessionController'); //importa os metodos para  iniciar o login.




const routes = express.Router(); //desaclopa o modulo de rotas do express em uma nova variavel.


routes.post('/sessions', SessionController.create );

//listar ongs
routes.get('/ongs', OngController.index );
//cadastrar ongs
routes.post('/ongs', OngController.create);

//cadastrar casos
routes.post('/incidents', IncidentController.create);
//listar casos
routes.get('/incidents', IncidentController.index);
//deletar casos
routes.delete('/incidents/:id', IncidentController.delete);
//listar casos especificos de uma ong
routes.get('/profile', ProfileController.index);


module.exports = routes; 



























/*
/1/rota para cadastrar ongs no banco de dados.
routes.post('/ongs', async (request, response)=> {  //metodo post pois ira criar   / async tornar a funcao assincrona.
        
    //para acessar do corpo da requisicao, alguns dados.
        // const data = request.body;     //data esta armazenando as informacoes de teste do insominia.
   //ou fazer a desistruturacao para pegar cada um dos dados em uma variavel separada.
   const {name, email, whatsapp, city, uf} = request.body;
   const id = crypto.randomBytes(4).toString('HEX'); // gera 4 caracteres aleatorios que serao convertidos para uma string do tipo hexadecimal.(esta tudo presente na documentação do node.js)
    
   await connection('ongs').insert({   //ira fazer os inserts dentro da tabela ongs /await para esperar o insert finalizar e entrar no return.

    id,
    name,
    email,
    whatsapp,
    city,
    uf
   });

      return response.json({id});    //retorna o id que é o que a ong vai usar para se conectar nas aplicação.
  }); 

*/
/*
//rota para listar ongs cadastradas no banco de dados.
routes.get('/ongs', async (request, response)=> { 

const ongs = await connection('ongs').select('*');   //selecionar todos os resistros da tabela ongs.

    return response.json(ongs);         //ira retornar um array
});
*/
            //próximo passo é deixar as rotas disponiveis para que o index.js possa acessa-lás.
//module.exports = routes;        // no node.js esse e o comando faz para exportar uma variavel de dentro de um arquivo.



