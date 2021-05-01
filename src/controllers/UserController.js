const User = require('../models/User');

function RetornaDataHoraAtual(){
  const dNow = new Date();
  const mes = dNow.getMonth();
  const Meses = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
  const localdate = (Meses[mes]) + '/' + dNow.getDate() + '/' + dNow.getFullYear();
  return localdate;
};

module.exports = {
  async index(req, res){
    const users = await User.findAll();
    return res.status(200).json(users);
  },

  async credenciais(req,res){
    const { matricula } = req.params;
    const find = await User.findOne({ where: { matricula: matricula } });
    if(!find) return res.status(400).json('Matrícula não encontrada.');
    const user = await User.findByPk( find.id, {include: { association: 'CrdRec'}});
    return res.status(200).json(user);
  },
  
  async findRecharge(req,res){
    const { matricula } = req.params;
    const find = await User.findOne({ where: { matricula: matricula } });
    if(!find) return res.status(400).json('Matrícula não encontrada.');
    const user = await User.findByPk( find.id, {include: { association: 'CrdRec'}});
    const Recargas = user.CrdRec;
    const validos = new Array();
    const dataA = RetornaDataHoraAtual();
    for(var i = 0, len = Recargas.length; i<len; i++){
      const data = Recargas[i].createdAt.toString();
      const parts = data.split(' ');
      if(!parts.length === 10) return res.status(401).json('Data inválida');
      const [ D, M, DN, A, H, Hrr, b, c, e, f] = parts;
      const dataC = M.concat('/',DN,'/',A);
      if( dataC === dataA ) validos.push(Recargas[i]);
    }
    var total = 0;
    for(i = 0,len = validos.length;i<len;i++){
      const str = validos[i].modo_pagto;
      if( str.match(/inheiro/)){
        total = total + validos[i].valor_recarga;
      }
    }
    return res.status(200).json(total);
  },

  async update(req,res)
  {
    const {matricula} = req.params;
    const user = await User.update({
      nome : req.body.nome,
      matricula : req.body.matricula,
      email: req.body.email
    },{ 
      where:{matricula:matricula}
    });
    return res.status(200).json(user);
  },

  async recarga(req,res)
  {
    const {matricula} = req.params;
    const recarga = await User.update({ saldo : req.body.saldo },{where:{matricula:matricula}});
    return res.status(200).json(recarga);
  },

  async delete(req,res)
  {
    const { matricula } = req.params;
    const user = await User.findOne({ where: { matricula: matricula } });
    if(!user) return res.status(400).json( 'Usuário não encontrado.' );
    await user.destroy();
    return res.status(200).json( 'Usuário removido com sucesso!' );
  },

  async findByMat(req,res){
    const { matricula } = req.params;
    const find = await User.findOne({ where: { matricula: matricula } });
    if(!find) return res.status(400).json('Usuário não encontrado.');
    find.senha = undefined;
    return res.status(200).json(find);
  },

  async store(req, res){
    const { matricula, nome, email, saldo } = req.body
    const user = await User.create({ 
      matricula,
      nome,
      email,
      saldo
    });
    if (user) return res.status(200).json('Usuário cadastrado com sucesso!');
    return res.status(400).json('Erro de cadastro!');
  }
};
