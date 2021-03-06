const { Model, DataTypes } = require('sequelize');

class Conter extends Model {
    static init(connection) {
      super.init({
    },{
        sequelize: connection
    })
    }
    static associate(models){
        this.belongsTo(models.Produto, { foreignKey:'id_produto', as: 'produtos'})
        this.belongsTo(models.Venda, { foreignKey:'id_venda', as: 'vendas'})
    }
}

module.exports = Conter;