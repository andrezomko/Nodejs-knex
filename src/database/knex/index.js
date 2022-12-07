//1 pegando o arq knex:
const config = require("../../../knexfile")
//2 importando knex:
const knex = require("knex")
//3 criando a conexao com o DB
const connection = knex(config.development) //conexao knex com as configs de conexao, q estao no config.development
//4-exportando a conexao p usar em outros lugares da app
module.exports = connection
    
