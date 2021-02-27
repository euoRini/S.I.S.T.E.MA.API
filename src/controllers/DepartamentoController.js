const Departamento = require('../models/Departamento');

module.exports = {
  async index(req,res)
  {
    const departamentos = await Departamento.findAll();
    return res.status(200).json(departamentos);
  },
};