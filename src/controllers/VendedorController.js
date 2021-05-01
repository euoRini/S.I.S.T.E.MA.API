const Vendedor = require('../models/Vendedor');
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
    const vendedor = await Vendedor.findOne({ where: { email: email } });
    if(!vendedor) return res.status(400).json('Vendedor não encontrado.');
    await vendedor.destroy();
    return res.status(200).json('Vendedor removido com sucesso!');
  },

  async deleteByMatricula(req,res)
  {
    const { matricula } = req.params;
    const vendedor = await Vendedor.findOne({ where: { matricula: matricula } });
    if(!vendedor) return res.status(400).json('Vendedor não encontrado!.');
    await vendedor.destroy();
    return res.status(200).json('Vendedor removido com sucesso!');
  },

  async findByMat(req,res){
    const { matricula } = req.params;
    const find = await Vendedor.findOne({ where: { matricula: matricula } });
    if(!find) return res.status(400).json('Vendedor não encontrado.');
    return res.status(200).json(find);
  },

  async index(req, res){
    const vendedores = await Vendedor.findAll();
    return res.status(200).json(vendedores);
  },

  async store(req, res){
    const { matricula, nome, email, id_depto, crpsenha } = req.body
    const senha = await bcrypt.hash(crpsenha, 10);
    const vendedor = await Vendedor.create({ matricula, id_depto, nome, email, senha });
    return res.status(200).json('Vendedor cadastrado com sucesso!');
  },

  async update(req,res)
  {
    const crpsenha = req.body.crpsenha;
    const senha = await bcrypt.hash(crpsenha, 10);
    const vendedor = await Vendedor.update({ nome : req.body.nome, matricula: req.body.matricula, email: req.body.email, senha:senha},{where:{matricula:req.body.matricula}});
    return res.status(200).json(vendedor);
  },

  async login(req,res){
    const {matricula, senha} = req.body;
    const user = await Vendedor.findOne({ where: { matricula: matricula } });
    if(!user) return res.status(400).json('Matrícula de vendedor não encontrada.');
    if(!await bcrypt.compare(senha, user.senha)) return res.status(400).json('Senha incorretos');
    user.senha = undefined;
    return res.status(200).send({ user, token: generateToken({id: user.id}) });
  }
};
