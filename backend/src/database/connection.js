 const knex = require('knex'); //importa o knex.
 const configuration = require('../../knexfile'); //importa as configuracoes do banco de dados que estao no arquivo knexfile.

 const connection = knex(configuration.development);  //cria a conexao utilizando o knex e pasando como parametro o configuration.development que é a conexao de desenvolvimento.

 module.exports = connection; //exportar de dentro do arquivo a conexao com o banco de dados.

 