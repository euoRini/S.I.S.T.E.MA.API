const User = require('../models/User');

module.exports = {
  async index(req, res){
    const users = await User.findAll();

    return res.status(200).json(users);
  },

  async credenciais(req,res){
    const { matricula } = req.params;
    const cardBmat = await User.findOne({ where: { matricula: matricula } }, {include: { association: 'CrdRec'}});
    if(!cardBmat){
      return res.status(400).json({ error: 'Matrícula não encontrada no banco de dados!'});
    }
    return res.status(200).json(cardBmat);
  },

  async update(req,res)
  {
    const {matricula} = req.params;
    const recarga = await User.update({ saldo : req.body.saldo },{where:{matricula:matricula}});
    return res.status(200).json(recarga);
  },

  async delete(req,res)
  {
    const { matricula } = req.params;
    const user = await User.findOne({ where: { matricula: matricula } });
    
    if(!user){
      return res.status(400).json({ error: 'Matrícula de usuário não encontrado em nosso banco de dados! '});
    }
    await user.destroy();
    return res.status(200).json({error: 'Usuario excluído'});
  },

  async store(req, res){
    const { matricula, nome, email, saldo } = req.body
    
    const user = await User.create({ matricula, nome, email, saldo });

    return res.status(200).send('200');
  }

  

};