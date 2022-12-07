const Router = require('express')
const routes = Router()

// importo a rota 
const usersRouter = require('./users.routes')
const notesRouter = require('./notes.routes')
const tagsRouter = require('./tags.routes')

//mando usar quando o notesRouter qd  for /notes
routes.use('/users', usersRouter)
routes.use('/notes', notesRouter)
routes.use('/tags', tagsRouter)
//exporto a pasta routes
module.exports=routes