const { connect } = require("http2");
const path = require("path")

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname,'src','database','database.db')
    },
    migrations:{
      directory: path.resolve(__dirname,'src','database','knex','migrations')
    },
    pool: { //PARA HABILITAR DELECAO EM CASCATA:
      afterCreate: (conn,cb)=> conn.run("PRAGMA foreign_keys = ON",cb)
    },
    useNullAsDefault: true
  }
};
