//1-importo knex
const knex = require("../database/knex")


//2-criando a class molde
class TagsController {
    //unico metodo: listar todas as tags do usuario cadastradas.
    async index(request,response){
        const {user_id} = request.params //recupera o user_id como parametro da req
//mando o knex pegar a tabela de tags do db:
        const tags = await knex("tags")
        .where({user_id} )     //vai nas tags e filtra o que seja igual ao user id
        return response.json(tags)
}}
module.exports = TagsController

