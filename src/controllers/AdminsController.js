const Admins = require('../models/Admins');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

function generateToken(params = {}){
  return jwt.sign(params, authConfig.secret,{
    expiresIn: 86400,
  });
};

module.exports = {
  
  async deleteByEmail(req,res)
  {
    const { email } = req.params;
    const admin = await Admins.findOne({ where: { email: email } });    
    if(!admin) return res.status(400).json('Email de administrador não encontrado.');
    await admin.destroy();
    return res.status(200).json('Conta de administrador removida com sucesso!');
  },

  async deleteByLogin(req,res)
  {
    const { login } = req.params;
    const admin = await Admins.findOne({ where: { login: login } });
    if (!admin) return res.status(400).json('Login de administrador não encontrado.');
    await admin.destroy();
    return res.status(200).json('Conta de administrador removida com sucesso!');
  },
   
  async findByemail(req,res){
    const { email } = req.params;
    const find = await Admins.findOne({ where: { email: email } });
    if(!find) return res.status(400).json('Email de administrador não encontrado.');
    find.senha = undefined;
    return res.status(200).json(find);
  },

  async findBylogin(req,res){
    const { login } = req.params;
    const find = await Admins.findOne({ where: { login: login } });
    if(!find) return res.status(400).json('Login de administrador não encontrado.');
    find.senha = undefined;
    return res.status(200).json(find);
  },

  async index(req, res){
    const admins = await Admins.findAll();
    admins.senha = undefined;
    return res.json(admins);
  },

  async store(req, res){
    const { nome, login, crpsenha, email } = req.body;
    const senha = await bcrypt.hash(crpsenha, 10);
    const admin = await Admins.create({nome, login, senha, email});
    return res.status(200).json('Administrador cadastrado com sucesso!');
  },

  async update(req,res)
  {
    const {login} = req.params;
    const crpsenha = req.body.crpsenha;
    const senha = await bcrypt.hash(crpsenha, 10);
    const adm = await Admins.update({ nome : req.body.nome, login: req.body.login, email: req.body.email, senha:senha},{where:{login:login}});
    return res.status(200).json(adm);
  },
  
  async login(req, res){
    const {login, senha} = req.body;
    const admin = await Admins.findOne({ where: { login: login } });
    if(!admin) return res.status(400).json('Login de administrador não encontrado.');
    if(!await bcrypt.compare(senha, admin.senha)) return res.status(400).json('Login ou senha incorretos');
    admin.senha = undefined;
    return res.status(200).send({ admin, token: generateToken({id: admin.id}) });
  }
};
