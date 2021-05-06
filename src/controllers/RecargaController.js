const User = require('../models/User');
const Recarga = require('../models/Recarga');

module.exports = {
  async index(req,res)
  {
    const recargas = await Recarga.findAll();
    return res.status(200).json(recargas);
  },

  async store(req, res){
    const { matricula } = req.params;
    const { modo_pagto, valor_recarga, id_admin} = req.body;
    const findUser = await User.findOne({where:{matricula:matricula}});
    const id_cartao = findUser.id;
    if(!findUser) return res.status(400).json('Cartão não cadastrado');

    const recarga = await Recarga.create({
      modo_pagto,
      valor_recarga,
      id_cartao,
      id_admin,
    });

    return res.status(200).json(recarga);
  }
};
