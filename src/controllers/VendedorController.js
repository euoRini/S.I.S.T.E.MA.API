const Vendedor = require('../models/Vendedor');

module.exports = {
  async index(req, res){
    const vendedores = await Vendedor.findAll();

    return res.json(vendedores);
  },

  async delete(req,res)
  {
    const { matricula } = req.params;
    const vendedor = await Vendedor.findOne({ where: { matricula: matricula } });
    
    if(!vendedor){
      return res.status(400).json({ error: 'Matrícula de vendedor não encontrado em nosso banco de dados! '});
    }
    await vendedor.destroy();
    return res.status(200).json({error: 'Vendedor excluído'});
  },

  async edelete(req,res)
  {
    const { email } = req.params;
    const vendedor = await Vendedor.findOne({ where: { email: email } });
    
    if(!vendedor){
      return res.status(400).json({ error: 'Email do vendedor não encontrado em nosso banco de dados! '});
    }
    await vendedor.destroy();
    return res.status(200).json({error: 'Vendedor excluído'});
  },

  async store(req, res){
    const { matricula, nome, email, senha } = req.body

    const vendedor = await Vendedor.create({ matricula, nome, email, senha });

    return res.json(vendedor);
  }
};