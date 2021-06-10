const { Model, DataTypes } = require('sequelize');

class Conter extends Model {
    static init(connection) {
      super.init({
    },{
        sequelize: connection
    })
    }
    static associate(models){
        this.hasOne(models.Produto, { foreignKey:'id_produto', through: 'conter', as: 'produtos'})
        this.hasOne(models.Venda, { foreignKey:'id_venda', through: 'conter', as: 'vendas'})
    }
}

module.exports = Conter;