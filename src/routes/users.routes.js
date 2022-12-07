const Router = require('express')

const UsersController = require("../controllers/UsersController")

const usersRoutes = Router()


const usersController = new UsersController();


usersRoutes.post("/",usersController.create ) 

usersRoutes.put("/:id", usersController.update)//**chamando o update


module.exports= usersRoutes;
