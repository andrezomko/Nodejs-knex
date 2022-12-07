//1.Importa o express
const Router = require('express')


//2.Importa o arq NotesController dos controllers
const NotesController = require("../controllers/NotesController")
//1.1 executa a const Router
const notesRoutes = Router()

//2.1.instanciando a classe NotesController criada dentro do arq controller/NotesController:
const notesController = new NotesController();

//1-create
notesRoutes.post("/:user_id",notesController.create ) //passo o user_id como parametro POR ENQUANTO

//!Crio o SHOW-get na minha rota:
notesRoutes.get("/:id",notesController.show)

//crio o delete na rota:
notesRoutes.delete("/:id",notesController.delete)

//crio o index (listar) na rota:
    // como vou passar o endereco por uma query nao preciso colcoar o "/:user_id"
notesRoutes.get("/",notesController.index)



//4.exporta o notesRoutes:
module.exports= notesRoutes;

//POR FIM PRECISO IMPORTAS A ROTA NO ROUTER/INDEX.JS