const express = require('express')
const router = express.Router()
const conexao = require('../db')

router.get("/", function (req, res) {
  conexao.query("SELECT * FROM produtos order by id desc", function (erro, dados, campos) {
    res.json(dados)
  })
})

router.get("/:id", function (req, res) {
  const id = req.params.id
  conexao.query("SELECT * FROM produtos where id = ? ", [id], function (erro, dados, campos) {
    res.json(dados)
  })
})

router.put("/:id", function (req, res) {
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

router.delete("/:id", function (req, res) {
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

router.post("/", function (req, res) {
  const data = req.body
  if (!data || typeof data.nome !== 'string' || data.nome.trim() === '') {
    return res.status(400).json({ status: 400, message: 'O campo titúlo é obrigatório e deve ser uma string.' })
  }
  if (typeof data.preco !== 'number' || Number.isNaN(data.preco)) {
    return res.status(400).json({ status: 400, message: 'O campo preco é obrigatório e deve ser número.' })
  }
  if (typeof data.estoque !== 'number' || Number.isNaN(data.estoque)) {
  } if (erro) {
      return res.status(500).json({ status: 500, error: erro.message || erro })
    }
    res.status(201).json({ status: 201, insertId: resultado.insertId })
  })

  module.exports = router