const Admins = require('../models/Admins');
const bcrypt = require('bcryptjs');

module.exports = {

  async deleteByEmail(req,res)
  {
    const { email } = req.params;
    const admin = await Admins.findOne({ where: { email: email } });
    
    if(!admin){
      return res.status(400).json({ error: 'Email do administrador não encontrado em nosso banco de dados! '});
    }
    await admin.destroy();
    return res.status(200).json({error: 'Administrador excluído'});
  },

  async deleteByLogin(req,res)
  {
    const { login } = req.params;
    const admin = await Admins.findOne({ where: { login: login } });
    
    if(!admin){
      return res.status(400).json({ error: 'Login de administrador não encontrado em nosso banco de dados! '});
    }
    await admin.destroy();
    return res.status(200).json({error: 'Administrador excluído'});
  },
   
  async findByemail(req,res){
    const { email } = req.params;
    const find = await Admins.findOne({ where: { email: email } });
    
    if(!find){
      return res.status(400).json({ error: 'Email de administrador não encontrado em nosso banco de dados! '});
    }

    return res.status(200).json(find);
  },

  async findBylogin(req,res){
    const { login } = req.params;
    const find = await Admins.findOne({ where: { login: login } });
    
    if(!find){
      return res.status(400).send('400');
    }

    return res.status(200).json(find);
  },

  async index(req, res){
    const admins = await Admins.findAll();

    return res.json(admins);
  },

  async store(req, res){
    const { nome, login, crpsenha, email } = req.body;
    const senha = await bcrypt.hash(crpsenha, 10);
    const admin = await Admins.create({nome, login, senha, email});

    return res.status(200).send('200');
  },

  async login(req, res){
    const {login, senha} = req.body;
    const admin = Admins.findOne({ login }).select('+senha');

    if(!admin) return res.status(400).send('400');

    if(!await bcrypt.compare(senha, admin.senha)) return res.status(400).send('400');

    return res.json(admin);
  }
};