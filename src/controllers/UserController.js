const User = require('../models/User');

module.exports = {
  async index(req, res){
    const users = await User.findAll();
    return res.status(200).json(users);
  },

  async credenciais(req,res){
    const { matricula } = req.params;
    const find = await User.findOne({ where: { matricula: matricula } });
    if(!find) return res.status(400).send('Matrícula não encontrada.');
    const user = await User.findByPk( find.id, {include: { association: 'CrdRec'}});
    return res.status(200).json(user);
  },
  
  async findRecharge(req,res){
    const { matricula } = req.params;
    const cardBmat = await User.findOne({ where: { matricula: matricula } }, {include: { association: 'CrdRec'}});
    if(!cardBmat) return res.status(400).send('Matrícula não encontrada.');
    
    
    
    
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
    if(!user) return res.status(400).send('Usuário não encontrado.');
    await user.destroy();
    return res.status(200).send('Usuário removido com sucesso!');
  },

  async store(req, res){
    const { matricula, nome, email, saldo } = req.body
    const user = await User.create({ matricula, nome, email, saldo });
    return res.status(200).send('Usuário cadastrado com sucesso!');
  }
};