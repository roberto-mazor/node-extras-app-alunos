const mysql = require('mysql')

let conexao = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

conexao.connect(function (erro) {
  if (erro) {
    console.log("Deu ruim na conexão \n")
    throw erro
  } else {
    console.log("Conexão deu bom \n")
  }
})

module.exports = conexao;