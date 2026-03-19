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


app.get("/produtos", function (req, res) {
  conexao.query("SELECT * FROM produtos order by id desc", function (erro, dados, campos) {
    res.json(dados)
  })
})

app.get("/produto/:id", function (req, res) {
  const id = req.params.id
  conexao.query("SELECT * FROM produtos where id = ? ", [id], function (erro, dados, campos) {
    res.json(dados)
  })
})

app.put("/produto/:id", function (req, res) {
  const id = req.params.id
  const data = req.body
  conexao.query("UPDATE produtos set ? where id = ?", [data, id], function (erro, resultado) {
    if (erro) {
      return res.status(500).json({ status: 500, error: erro.message || erro })
    }
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ status: 404, message: "Produto não encontrado" })
    }
    res.json({ status: 200, message: "Atualizado com sucesso!" })
  })
})

app.delete("/produto/:id", function (req, res) {
  const id = req.params.id
  conexao.query("DELETE FROM produtos WHERE id = ?", [id], function (erro, resultado) {
    if (erro) {
      return res.status(500).json({ status: 500, error: erro.message || erro })
    }
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ status: 404, message: "Produto não encontrado" })
    }
    res.json({ status: 200, message: "Excluído com sucesso!" })
  })
})

app.post("/produto/", function (req, res) {
  const data = req.body
  if (!data || typeof data.nome !== 'string' || data.nome.trim() === '') {
    return res.status(400).json({ status: 400, message: 'O campo nome é obrigatório e deve ser uma string.' })
  }
  if (typeof data.preco !== 'number' || Number.isNaN(data.preco)) {
    return res.status(400).json({ status: 400, message: 'O campo preco é obrigatório e deve ser número.' })
  }
  if (typeof data.estoque !== 'number' || Number.isNaN(data.estoque)) {
    return res.status(400).json({ status: 400, message: 'O campo estoque é obrigatório e deve ser número.' })
  }

  conexao.query('INSERT INTO produtos set ?', [data], function (erro, resultado) {
    if (erro) {
      return res.status(500).json({ status: 500, error: erro.message || erro })
    }
    res.status(201).json({ status: 201, insertId: resultado.insertId })
  })
})



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