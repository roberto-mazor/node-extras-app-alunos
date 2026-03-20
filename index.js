require('dotenv').config()
const express = require('express')
const cors = require('cors')

const conexao = require('./db')

const app = express()
app.use(cors())
app.use(express.json())

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

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})