const Vendedor = require('../models/Vendedor');
const Venda = require('../models/Venda');

module.exports = {
  async index(req,res)
  {
    const vendas = await Venda.findAll();
    return res.status(200).json(vendas);
  },

  async store(req, res){
    const { matricula } = req.params;
    const { total_venda } = req.body;
    const findVend = await Vendedor.findOne({where:{matricula:matricula}});
    if(!findVend) return res.status(400).json('Vendedor não encontrado');
    const id_vendedor = findVend.id;
    const venda = await Venda.create({ id_vendedor, total_venda });
    return res.status(200).json(venda);
  }
};