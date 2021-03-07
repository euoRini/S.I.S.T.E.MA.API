const Departamento = require('../models/departamento');

module.exports = {
  async index(req,res)
  {
    const departamentos = await Departamento.findAll();
    return res.status(200).json(departamentos);
  },
  async store(req, res){
    const { nome, categoria } = req.body;
    const depto = await Departamento.create({nome, categoria});
    return res.status(200).json('Departamento cadastrado com sucesso!');
  },

  async delete(req,res)
  {
    const { nome } = req.params;
    const depto = await Departamento.findOne({ where: { nome: nome } });
    if(!depto) return res.status(400).json('Departamento não cadastrado.');
    await depto.destroy();
    return res.status(200).json('Registro de departamento deletado com sucesso!');
  },
  
  async find(req,res){
    const { nome } = req.params;
    const find = await Departamento.findOne({ where: { nome: nome } });  
    if(!find) return res.status(400).json('Departamento não encontrado.');
    return res.status(200).json(find);
  },

 async update(req,res)
  {
    const {nome} = req.params;
    const depto = await Departamento.update({
      nome : req.body.nome,
      categoria: req.body.categoria
    }, {
      where:{nome:nome}
    });
    return res.status(200).json(depto);
  },
};