//cria tabela chamada notes, table => {crio os campos dessa tabela}
exports.up = knex => knex.schema.createTable('notes', table => {
    // CAMPOS DA TABELA notes
        table.increments('id')
        table.text('title')
        table.text('descriptions')
        table.integer('rating')
        table.integer('user_id').references('id').inTable('users')
        // para criar timestamp 
        table.timestamp('created_at').default(knex.fn.now())
        table.timestamp('updated_at').default(knex.fn.now())
    })
    
    exports.down = function(knex) {
      
    };
    
