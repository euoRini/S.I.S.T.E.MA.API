const Venda = require('../models/Venda');
const Pagamento = require('../models/Pagamento');

module.exports = {
  async index(req,res)
  {
    const pagamentos = await Pagamento.findAll();
    return res.status(200).json(pagamentos);
  },

  async store(req, res){
    const { id_venda } = req.params;
    const { total_pagto } = req.body;
    const venda = await Venda.findByPk(id_venda);
    if(!venda) return res.status(400).json({ error: 'Venda não encontrada em nosso banco de dados.'});
    const pagamento = await Pagamento.create({ total_pagto, id_venda,});
    return res.status(200).json(pagamento);
  }
};