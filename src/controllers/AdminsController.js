const Admins = require('../models/Admins');

module.exports = {
  async index(req, res){
    const admins = await Admins.findAll();

    return res.json(admins);
  },

  async store(req, res){
    const { nome, login, senha, email } = req.body

    const admin = await Admins.create({ nome, login, senha, email});

    return res.json(admin);
  }
};