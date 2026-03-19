require('dotenv').config()
const express = require('express')
const cors = require('cors')

const conexao = require('./db')

const app = express()
app.use(cors())
app.use(express.json())

const produtosRoutes = require('./routes/produtosRoustes')

app.use('/produtos', produtosRoutes)

let usuarios = ["paulo", "cris"]

app.get("/usuarios/", function (req, res) {
  res.send(usuarios)
})

app.post("/usuarios/", function (req, res) {
  const item = req.body.nome
  usuarios.push(item)
  res.send("Item adicionado com sucesso!")
})

app.put("/usuarios/:id", function (req, res) {
  const id = req.params.id - 1
  const novoItem = req.body.nome
  usuarios[id] = novoItem
  res.send("Item atualizado com sucesso!")
})

app.delete("/usuarios/:id", function (req, res) {
  const id = req.params.id - 1
  delete usuarios[id]
  res.send("Item removido com sucesso!")
}) 



const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})