
const Router = require('express')
const TagsController = require("../controllers/TagsController")
const tagsRoutes = Router()
const tagsController = new TagsController();

tagsRoutes.get("/:user_id",tagsController.index)

module.exports= tagsRoutes;

//POR FIM PRECISO IMPORTAS A ROTA NO ROUTER/INDEX.JS