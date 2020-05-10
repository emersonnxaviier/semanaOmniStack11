




const express = require('express');
const routes = require('./routes'); //importa o arquivo de rotas do routes.js.
const cors = require('cors');


const app = express();  

app.use(cors());
app.use(express.json());   
app.use(routes); //é importante deixar esse codigo exatamente apos o que esta acima.

app.listen(3333); 





















/*
const express = require('express'); //importando o modulo express com todas as funcionalidades para a variavel express.
const app = express();              //variavel que vai armazenar a aplicacao.
                                    //informar ao app que usaremos JSON para as requisicoes, para o corpo das requisicoes.
app.use(express.json());            //deve vir antes das requisicoes; o express vai no corpo da requisicao converter o JSON em um objeto do Java Script.
*/
/*
                                    //acessar todos os parametros que vem atraves dos query parms.

app.post('/users', (request, response)=> {    //estou criando uma rota, nesse caso a inicial que ira retornar uma mensagem. ex: localhost:3333/users, o todo é uma rota, /users e o recurso.
  const parms = request.query;
  console.log(parms);  //mostrar no terminal.

  return response.json({
    Evento: 'Semana OmniStack 11.0',
    Aluno: 'Émerson Xavier'
});
});
*/

/*
                                      //acessar todos os parametros que vem atraves dos route parms.
 app.post('/users/:id', (request, response)=> {    //estou criando uma rota, nesse caso a inicial que ira retornar uma mensagem. ex: localhost:3333/users, o todo é uma rota, /users e o recurso.
  const parms = request.params;
  console.log(parms);  //mostrar no terminal.
  return response.json({
    Evento: 'Semana OmniStack 11.0',
    Aluno: 'Émerson Xavier'
});
});
*/
/*
                                      //acessar todos os parametros que vem atraves do request body.
app.post('/users', (request, response)=> {         //estou criando uma rota, nesse caso a inicial que ira retornar uma mensagem. ex: localhost:3333/users, o todo é uma rota, /users e o recurso.
  const body = request.body;
  console.log(body);  //mostrar no terminal.
  return response.json({
    Evento: 'Semana OmniStack 11.0',
    Aluno: 'Émerson Silva'
});
});                                   //no insominia alterar o body para JSON.
*/
  
                                      //usar em qualquer um.
//app.listen(3333);                     // a aplicacao ira rodar nessa porta.

