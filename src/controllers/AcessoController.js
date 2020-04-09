const Admins = require('../models/Admins');
const Vendedor = require('../models/Vendedor');
const Acesso = require('../models/Acesso');

module.exports = {
  async index(req,res)
  {
    const acessos = await Acesso.findAll();

    return res.json(acessos);
  },

  async store(req, res){
    const { id_admin, id_vendedor } = req.params;
    const { data_acesso } = req.body;

    const admin = await Admins.findByPk(id_admin);
    const vendedor = await Vendedor.findByPk(id_vendedor);

    if(!admin){
      return res.status(400).json({ error: 'Administrador não encontrado'});
    }

    if(!vendedor){
      return res.status(400).json({ error: 'Vendedor não encontrado'});
    }

    const acesso = await Acesso.create({
      id_admin,
      id_vendedor,
      data_acesso,
    });

    return res.json(acesso);
  }
};