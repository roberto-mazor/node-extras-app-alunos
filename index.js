require('dotenv').config()
const express = require('express')
const cors = require('cors')

const conexao = require('./db')

const app = express()
app.use(cors())
app.use(express.json())

const routerProdutos = require('./routes/produtosRoutes')
const routerUsuarios = require('./routes/usuariosRoutes')

app.use('/produtos', routerProdutos)
app.use('/usuarios', routerUsuarios) 

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})