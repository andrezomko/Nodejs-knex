const  {hash, compare}  = require('bcryptjs') //1)  
const AppError = require("../utils/AppError")


const sqliteConnection = require('../database/sqlite/index.js')


class UsersController{
//criar usuario
    async create(request, response){
        const {nome, email,senha} = request.body

        const database = await sqliteConnection() 

        const checkUserExist = await database.get('SELECT * FROM users WHERE email = (?)', [email]) //substituo a ? pela variavel email. Respeita a mesma sequencia de interrogacoes.
        if(checkUserExist){
            throw new AppError('este email ja esta em uso') 
        }
        const hashedPassword =  await hash(senha,8) //2

         await database.run("INSERT INTO users (name, email, password ) VALUES (?,?,?)",[nome,email,hashedPassword])
         return response.status(201).json('Usuario criado com sucesso') 
    }

//  atualizando dados usuario
   async update (request,response){
        const {nome,email,password,oldPassword} = request.body //desestruturando
        const {id} = request.params  //desestruturando

    //  conexao com o DB:
        const database = await sqliteConnection()
    //   selecionando usuario pelo ID 
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [id])
    //  usuario ja existe? 
        if(!user){
            throw new AppError('Usuario nao encontrado')
        }
//       email ja existe?
        const userWithUpdatedEmail = await database.get('SELECT * FROM users WHERE email = (?)', [email])
//      verificacao email 
        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){ //email pertence a ID de outro usuario registrado.
            throw new AppError('este email ja esta em uso')
        }
    //  substituindo os valores na tabela: 
        user.name = nome ?? user.name //se tiver conteudo no nome uso ele, se nao, usarei o  user.nome, q ja esta presente no banco
        user.email= email ?? user.email
    
//    ---     Verificacoes Senha--- 
//     verficando se digitou a senha antiga tambem:
    if(password && !oldPassword){
        throw new AppError("você precisa informar a senha antiga para definir a nova senha")
    }   
//  oldPassword ->  REQ  user.senha -> DB
//   Esta colocando a senha antiga correta?    
    if(password && oldPassword ){//se os dois foram informados
        const checkOldPassword = await compare(oldPassword, user.password) //comparando a senha antiga com a senha do banco ambas criptografadas
        if(!checkOldPassword){
            throw new AppError('senha antiga nao confere!')
         }
         //atualizando a senha
         user.password = await hash(password,8)
    }

    //atualizando na tabela de users:
        await database.run(`UPDATE users SET 
        name = ? ,
        email = ? ,
        password = ?,
        updated_at = DATETIME('now') WHERE id = ? ` ,
        [user.name,user.email,user.password , id])

        return response.status(200).json();  
    }
} 
module.exports = UsersController