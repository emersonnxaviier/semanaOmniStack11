 
 const crypto = require('crypto');  //pacote de criptografia, mas que utilizaremos apenas o metodo para gerar strings aleatorias.
 const connection = require('../database/connection'); //importando conexao com o banco de dados.

 //ira exportar um objeto de dentro com os metodos como create, 
 module.exports = {

   //listar
   async index(request, response){ 
      const ongs = await connection('ongs').select('*'); 
          return response.json(ongs);         
      },

    //criar
 async create(request, response){

    const {name, email, whatsapp, city, uf} = request.body;
    const id = crypto.randomBytes(4).toString('HEX');
    await connection('ongs').insert({ 
        id,
        name,
        email,
        whatsapp,
        city,
        uf
       });
    
          return response.json({id}); 
   }   
};