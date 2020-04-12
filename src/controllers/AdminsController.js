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
    return res.status(200).json({error: 'Administrador excluído'});
  },
  
  async edelete(req,res)
  {
    const { email } = req.params;
    const admin = await Admins.findOne({ where: { email: email } });
    
    if(!admin){
      return res.status(400).json({ error: 'Email do administrador não encontrado em nosso banco de dados! '});
    }
    await admin.destroy();
    return res.status(200).json({error: 'Administrador excluído'});
  },

  async findBylogin(req,res){
    const { login } = req.params;
    const find = await Admins.findOne({ where: { login: login } });
    
    if(!find){
      return res.status(400).json({ error: 'Login de administrador não encontrado em nosso banco de dados! '});
    }

    return res.json(find);
  },

  async findByemail(req,res){
    const { email } = req.params;
    const find = await Admins.findOne({ where: { email: email } });
    
    if(!find){
      return res.status(400).json({ error: 'Email de administrador não encontrado em nosso banco de dados! '});
    }

    return res.json(find);
  },

  async store(req, res){
    const { nome, login, senha, email } = req.body

    const admin = await Admins.create({ nome, login, senha, email});

    return res.json(admin);
  }
};