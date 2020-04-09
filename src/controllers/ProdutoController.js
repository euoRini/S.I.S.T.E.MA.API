const Produto = require('../models/Produto');

module.exports = {
  async index(req, res){
    const produtos = await Produto.findAll();

    return res.json(produtos);
  },

  async store(req, res){
    const { nome, preco, estoque, categoria } = req.body

    const produto = await Produto.create({ nome, preco, estoque, categoria });

    return res.json(produto);
  }
};