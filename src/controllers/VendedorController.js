const Vendedor = require('../models/Vendedor');

module.exports = {

  async deleteByEmail(req,res)
  {
    const { email } = req.params;
    const vendedor = await Vendedor.findOne({ where: { email: email } });
    
    if(!vendedor){
      return res.status(400).send('400');
    }
    await vendedor.destroy();
    return res.status(200).send('200');
  },

  async deleteByMatricula(req,res)
  {
    const { matricula } = req.params;
    const vendedor = await Vendedor.findOne({ where: { matricula: matricula } });
    
    if(!vendedor){
      return res.status(400).send('400');
    }
    await vendedor.destroy();
    return res.status(200).send('200');
  },

  async findByEmail(req,res){
    const { email } = req.params;
    const find = await Vendedor.findOne({ where: { email: email } });
    
    if(!find){
      return res.status(400).json({ error: 'Email do vendedor não encontrado em nosso banco de dados! '});
    }

    return res.status(200).json(find);
  },

  async findByMatricula(req,res){
    const { matricula } = req.params;
    const find = await Vendedor.findOne({ where: { matricula: matricula } });
    
    if(!find){
      return res.status(400).json({ error: 'Matrícula de vendedor não encontrado em nosso banco de dados! '});
    }

    return res.status(200).json(find);
  },

  async index(req, res){
    const vendedores = await Vendedor.findAll();

    return res.status(200).json(vendedores);
  },

  async store(req, res){
    const { matricula, nome, email, senha } = req.body

    const vendedor = await Vendedor.create({ matricula, nome, email, senha });

    return res.status(200).send('200');
  }
};