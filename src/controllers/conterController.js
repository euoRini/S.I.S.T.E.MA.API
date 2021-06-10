const Conter = require('../models/Conter');
module.exports = {

    async store(req, res){
        const { id_produto, id_venda} = req.body
        
        const contem = await Conter.create({ 
            id_produto,
            id_venda,
        });
        if (contem) return res.status(200).json('Adição de produtos realizada com sucesso');
        return res.status(400).json('Erro de cadastro de produtos na venda!');
      }
}