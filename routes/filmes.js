// routes/filmes.js
const express = require('express');
const router = express.Router();
const { Filme } = require('../models');

// Rota para cadastrar um filme
router.post('/', async (req, res) => {
  try {
    const filme = await Filme.create(req.body);
    res.status(201).json(filme);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao cadastrar filme' });
  }
});

// Rota para obter todos os filmes
router.get('/', async (req, res) => {
  try {
    const filmes = await Filme.findAll();
    res.status(200).json(filmes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter filmes' });
  }
});

// Rota para obter um filme por ID
router.get('/:id', async (req, res) => {
  try {
    const filme = await Filme.findByPk(req.params.id);
    if (!filme) {
      res.status(404).json({ error: 'Filme não encontrado' });
      return;
    }
    res.status(200).json(filme);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter filme' });
  }
});

// Rota para atualizar um filme por ID
router.put('/:id', async (req, res) => {
  try {
    const [updatedRows] = await Filme.update(req.body, {
      where: { id: req.params.id }
    });
    if (updatedRows === 0) {
      res.status(404).json({ error: 'Filme não encontrado' });
      return;
    }
    const updatedFilme = await Filme.findByPk(req.params.id);
    res.status(200).json(updatedFilme);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar filme' });
  }
});

// Rota para deletar um filme por ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedFilme = await Filme.findByPk(req.params.id);
    if (!deletedFilme) {
      res.status(404).json({ error: 'Filme não encontrado' });
      return;
    }
    await Filme.destroy({ where: { id: req.params.id } });
    res.status(204).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao deletar filme' });
  }
});

module.exports = router;
