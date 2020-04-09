const User = require('../models/User');

module.exports = {
  async index(req, res){
    const users = await User.findAll();

    return res.json(users);
  },

  async store(req, res){
    const { matricula, nome, email, saldo } = req.body

    const user = await User.create({ matricula, nome, email, saldo });

    return res.json(user);
  }
};