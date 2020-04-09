const Vendedor = require('../models/Vendedor');

module.exports = {
  async index(req, res){
    const vendedores = await Vendedor.findAll();

    return res.json(vendedores);
  },

  async store(req, res){
    const { matricula, nome, email, senha } = req.body

    const vendedor = await Vendedor.create({ matricula, nome, email, senha });

    return res.json(vendedor);
  }
};