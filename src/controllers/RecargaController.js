const User = require('../models/User');
const Recarga = require('../models/Recarga');

module.exports = {
  async index(req,res)
  {
    const recargas = await Recarga.findAll();

    return res.json(recargas);
  },

  async store(req, res){
    const { id_cartao } = req.params;
    const { modo_pagto, valor_recarga} = req.body;

    const user = await User.findByPk(id_cartao);

    if(!user){
      return res.status(400).json({ error: 'User not found'});
    }

    const recarga = await Recarga.create({
      modo_pagto,
      valor_recarga,
      id_cartao,
    });

    return res.json(recarga);
  }
};