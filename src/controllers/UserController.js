const User = require('../models/User');

module.exports = {
  async index(req, res){
    const users = await User.findAll();

    return res.json(users);
  },

  async credenciais(req,res){
    const { matricula } = req.params;
    const cardBmat = await User.findOne({ where: { matricula: matricula } });
    if(!cardBmat){
      return res.status(400).json({ error: 'Matrícula não encontrada no banco de dados!'});
    }
    return res.json(cardBmat);
  },

  async store(req, res){
    const { matricula, nome, email, saldo } = req.body

    const user = await User.create({ matricula, nome, email, saldo });

    return res.json(user);
  }
};