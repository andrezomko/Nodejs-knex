
const knex = require("../database/knex")

class  NotesController{

    async create(request,response){
        const { title, descriptions, rating, tags}= request.body //2.1 desestruturando e pegando do body da requisicao
        const {user_id} = request.params //2.2 pegando o user_id como id parametro da requisicao

        //2.3- inserindo uma nota:
        const note_id = await knex("notes").insert({ //devolve o codigo da nota que foi gerada
            // aqui passo o objeto que quero inserir: pega da request e bota na tabela notes
            title,
            descriptions,
            rating,
            user_id})
//     

        // 2.4 inserir [tags] vinculadas a nota gerada pela request:
        const tagsInsert = tags.map(name=>{
            return{ 
                note_id, //aqui vincula a id da nota à tag sendo inserida pela req
                name,
                user_id
            }})
        // 2.4.1inserir na tabela tags a tag nova (o objeto do tagsInsert)
        await knex("tags").insert(tagsInsert)
        // 2.5 faco o json:
        response.json('Nota e suas tags foram inseridas com sucesso'); 
    }
    //------------------------------------------------------------------------------------------------------------
//  metodo (SHOW)-get  
    async show(request, response){
// pegando o ID        
        const {id} = request.params 
// selecionando a nota especifica pelo ID pego acima:
        const note = await knex("notes").where({id}).first()
// selecionando as tags quando o note_id for igual ao id parameter,ordenado alfabeticamente pelo nome:
        const tags =  await knex("tags").where({note_id : id}).orderBy("name")
// retornando a nota como um objeto de  resposta em JSON        
        return response.json({
            ...note,
            tags
        })
    }

    //---------------------------------------------------------------------------------------------------
// metodo DELETE a movie
    async delete(request, response){
        const {id} = request.params //id do filme
      await knex("notes").where({id}).delete()
      return response.json()
    }

//---------------------------------------------------------------------------------------------------    
//metodo p Listar notas:INDEX
    async index(request,response){  

        const {user_id, title,tags} = request.query

       let notes 

       if(tags){ 

        const filterTags = tags.split(",").map(tag=>tag.trim())

        
        notes = await  knex("tags").select([
            "notes.id",
            "notes.title",
            "notes.rating",
            "notes.user_id"
        ]).where("notes.user_id",user_id) 
        .whereLike("notes.title",`%${title}%`)
        .whereIn("name",filterTags) 
        .innerJoin("notes","notes.id","tags.note_id")
        .orderBy("notes.title")

       }else{
        notes = await knex("notes") 
        .where({user_id})
        .whereLike("title", `%${title}%`)
        .orderBy("title")
       }

       const userTags = await knex('tags').where({user_id}) 
       const notesWithTags = notes.map( note=>{
       const noteTags =  userTags.filter(tag=> tag.note_id === note.id )
        
        return{ 
            ...note,
            tags:noteTags
        }
    })
        return response.json(notesWithTags)
    }

}

module.exports = NotesController