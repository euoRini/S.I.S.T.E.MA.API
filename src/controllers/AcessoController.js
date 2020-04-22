const Admins = require('../models/Admins');
const Vendedor = require('../models/Vendedor');
const Acesso = require('../models/Acesso');

module.exports = {

  async confirm(req,res)
  {
    const { id_acesso } = req.params;
    const { id_admin } = req.body;
    const admin = await Admins.findByPk(id_admin);
    const acesso = await Acesso.findByPk(id_acesso);
    if(!admin){
      return res.status(400).json({ error: 'Administrador não encontrado em nosso banco de dados'});
    }
    if(!acesso){
      return res.status(400).json({ error: 'Acesso não encontrado em nosso banco de dados'});
    }

    const confirm = await Acesso.update({ id_admin : req.body.id_admin },{where:{id:id_acesso}});
    return res.status(200).json(confirm);

  },
  
  async index(req,res)
  {
    const acessos = await Acesso.findAll();

    return res.json(acessos);
  },

  async indexAdmin(req,res)
  {
    const { id_admin } = req.params;
    const admin = await  Admins.findByPk(id_admin,{include: { association: 'ADMacessos'}});
    if(!admin){
      return res.status(400).json({ error: 'Administrador não encontrado em nosso banco de dados'});
    }
    return res.json(admin);
  },

  async indexVendedor(req,res)
  {
    const { matricula } = req.params;
    const vendedor = await  Vendedor.findByPk(matricula,{include: {association: 'VENDacessos'} });
    if(!vendedor){
      return res.status(400).json({ error: 'Vendedor não encontrado em nosso banco de dados'});
    }
    return res.json(vendedor);
  },

  async store(req, res){
    const { id_vendedor } = req.params;
    const { id_admin } = req.body;
    const vendedor = await Vendedor.findOne({where:{id:id_vendedor}});
    if(!vendedor){
      return res.status(400).json({ error: 'Vendedor não encontrado'});
    }
    const matricula_vendedor = vendedor.matricula;
    const acesso = await Acesso.create({id_vendedor,matricula_vendedor, id_admin});

    return res.json(acesso);
  }
};