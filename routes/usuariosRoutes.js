const express = require('express')
const router = express.Router()
const conexao = require('../db')

let usuarios = ["paulo", "cris"]

router.get("/", function (req, res) {
  res.send(usuarios)
})

router.post("/", function (req, res) {
  const item = req.body.nome
  usuarios.push(item)
  res.send("Item adicionado com sucesso!")
})

router.put("/:id", function (req, res) {
  const id = req.params.id - 1
  const novoItem = req.body.nome
  usuarios[id] = novoItem
  res.send("Item atualizado com sucesso!")
})

router.delete("/:id", function (req, res) {
  const id = req.params.id - 1
  delete usuarios[id]
  res.send("Item removido com sucesso!")
}) 

 module.exports = router