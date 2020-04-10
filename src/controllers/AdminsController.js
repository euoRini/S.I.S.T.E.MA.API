const Admins = require('../models/Admins');

module.exports = {
  async index(req, res){
    const admins = await Admins.findAll();

    return res.json(admins);
  },

  async delete(req,res)
  {
    const { login } = req.params;
    const admin = await Admins.findOne({ where: { login: login } });
    
    if(!admin){
      return res.status(400).json({ error: 'Login de administrador não encontrado em nosso banco de dados! '});
    }
    await admin.destroy();
    return res.json();
  },

  async login(req,res){
    const { login } = req.params;
    const logadm = await Admins.findOne({ where: { login: login } });
    
    if(!logadm){
      return res.status(400).json({ error: 'Login de administrador não encontrado em nosso banco de dados! '});
    }

    return res.json(logadm);
  },

  async store(req, res){
    const { nome, login, senha, email } = req.body

    const admin = await Admins.create({ nome, login, senha, email});

    return res.json(admin);
  }
};