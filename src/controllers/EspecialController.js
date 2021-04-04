const Acesso = require('../models/Acesso');
const Admins = require('../models/Admins');
const Vendedor = require('../models/Vendedor');
const Departamento = require('../models/departamento');
const Venda = require('../models/Venda');
const Pagamento = require('../models/Pagamento');
const Produto = require('../models/Produto');
const User = require('../models/User');
const Recarga = require('../models/Recarga');

module.exports = {
  async report(req,res)
  {
    const { search } = req.params;
    const { data } = req.body;

    switch (search){
        case '001':

            return res.status(200).json('Teste 01');

        case '002':

            return res.status(200).json('Teste 02');

        case '003':

            return res.status(200).json('Teste 03');

        case '004':

            return res.status(200).json('Teste 04');

        case '005':

            return res.status(200).json('Teste 05');

        case '006':
            
            return res.status(200).json('Teste 06');

        default:
            return res.status(399).json('Tipo de relatório inválido ou não registrado! Entre em contato com algum administrador');
    } 
  },
};