
exports.up = function(knex) { //metodo responsavel pela criacao da tabela.
    return knex.schema.createTable('incidents', function(table) {
        table.increments();         //cria uma chave primaria auto increment.
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();
        
        table.string('ong_id').notNullable();//ira armazenar qual ong criou o incidente.

        table.foreign('ong_id').references('id').inTable('ongs'); //chave estrangeira da tabela ongs.
    });
};

exports.down = function(knex) { // ira desfazer oque foi feito caso ocorra algum problema.
  return knex.schema.dropTable('incidents');
};
