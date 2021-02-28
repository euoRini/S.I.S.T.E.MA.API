const Departamento = require('../models/Departamento');

module.exports = {
  async index(req,res)
  {
    const departamentos = await Departamento.findAll();
    return res.status(200).json(departamentos);
  },
  async store(req, res){
    const { nome, categoria } = req.body;
    const depto = await Admins.create({nome, categoria});
    return res.status(200).json('Departamento cadastrado com sucesso!');
  },
};