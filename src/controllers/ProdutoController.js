const Venda = require('../models/Venda')
const Produto = require('../models/Produto');

module.exports = {
  async index(req, res){
    const produtos = await Produto.findAll();

    return res.json(produtos);
  },

  async prodvend(req, res){
    const {id_venda} = req.params;

    const venda = await Venda.findByPk(id_venda, { include: {association: 'produtos'}})

    return res.json(venda);
  },

  async newProd(req,res){
    const { nome, preco, estoque, categoria } = req.body

    const produto = await Produto.create({ nome, preco, estoque, categoria });

    return res.json(produto);
  },

  async store(req, res){
    const {id_venda} = req.params;
    const { nome, preco, estoque, categoria } = req.body

    const venda = await Venda.findByPk(id_venda);

    if(!venda){
      return res.status(400).json({ error: 'Venda não encontrada'});
    }

    const [ produto ] = await Produto.findOrCreate({
      where:{ nome },
      preco,
      estoque,
      categoria
      });

    await venda.addProduto(produto);

    return res.json(produto);
  }
};