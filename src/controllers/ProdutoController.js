const Venda = require('../models/Venda')
const Produto = require('../models/Produto');

module.exports = {
  async addProdutosVenda(req, res){
    const {id_venda} = req.params;
    const { produtoX } = req.body
    const venda = await Venda.findByPk(id_venda);
    if(!venda) return res.status(400).json('Venda não encontrada');
    produtoX.forEach({
      
    })
    const prod = awaits Produto.findByPk(produtoX.id)
    

    await venda.addProduto(produto);
    return res.status(200).json(produto);
  },

  async deleteByName(req,res)
  {
    const { nome } = req.params;
    const produto = await Produto.findOne({ where: { nome: nome } });
    if(!produto) return res.status(400).json('Produto não cadastrado.');
    await produto.destroy();
    return res.status(200).json('Produto removido do catálogo com sucesso!');
  },
  
  async findByName(req,res){
    const { nome } = req.params;
    const find = await Produto.findOne({ where: { nome: nome } });  
    if(!find) return res.status(400).json('Produto não encontrado.');
    return res.status(200).json(find);
  },

  async index(req, res){
    const produtos = await Produto.findAll();
    return res.status(200).json(produtos);
  },

  async produtosVenda(req, res){
    const {id_venda} = req.params;
    const venda = await Venda.findByPk(id_venda, {
      include: {association: 'produtos'}
    })
    return res.json(venda);
  },

  async update(req,res)
  {
    const {nome} = req.params;
    const prod = await Produto.update({
      nome : req.body.nome,
      preco: req.body.preco,
      estoque: req.body.estoque,
      categoria: req.body.categoria
    }, {
      where:{nome:nome}
    });
    return res.status(200).json(prod);
  },

  async store(req,res){
    const { nome, preco, estoque, categoria } = req.body
    const produto = await Produto.create({ nome, preco, estoque, categoria });
    return res.status(200).json(produto);
  }
};
