const Vendedor = require('../models/Vendedor');
const Venda = require('../models/Venda');

module.exports = {
  async index(req,res)
  {
    const vendas = await Venda.findAll();

    return res.json(vendas);
  },
  async store(req, res){
    const { id_vendedor } = req.params;
    const { total_venda } = req.body;

    const vendedor = await Vendedor.findByPk(id_vendedor);

    if(!vendedor){
      return res.status(400).json({ error: 'Nenhum vendedor cadastrado neste ID'});
    }

    const venda = await Venda.create({
      id_vendedor,
      total_venda,
    });

    return res.json(venda);
  }
};