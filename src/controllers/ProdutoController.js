const Venda = require('../models/Venda')
const Produto = require('../models/Produto');

module.exports = {
  async addProdutosVenda(req, res){
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

    return res.status(200).json(produto);
  },

  async deleteByName(req,res)
  {
    const { nome } = req.params;
    const produto = await Produto.findOne({ where: { nome: nome } });
    
    if(!produto){
      return res.status(400).json({ error: 'Produto não encontrado em nosso banco de dados! '});
    }
    await produto.destroy();
    return res.status(200).json({error: 'Produto excluído'});
  },
  

  async findByName(req,res){
    const { nome } = req.params;
    const find = await Admins.findOne({ where: { nome: nome } });
    
    if(!find){
      return res.status(400).json({ error: 'Produto não encontrado em nosso banco de dados! '});
    }

    return res.status(200).json(find);
  },

  async index(req, res){
    const produtos = await Produto.findAll();

    return res.status(200).json(produtos);
  },

  async produtosVenda(req, res){
    const {id_venda} = req.params;

    const venda = await Venda.findByPk(id_venda, { include: {association: 'produtos'}})

    return res.json(venda);
  },

  async store(req,res){
    const { nome, preco, estoque, categoria } = req.body

    const produto = await Produto.create({ nome, preco, estoque, categoria });

    return res.status(200).json(produto);
  }
};