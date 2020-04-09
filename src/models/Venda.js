const { Model, DataTypes } = require('sequelize');

class Venda extends Model {
    static init(connection) {
      super.init({
        total_venda: DataTypes.STRING(50),
    },{
        sequelize: connection
    })
    }
    static associate(models){
        this.belongsTo(models.Vendedor, { foreignKey: 'id_vendedor', as: 'vendedor'});
//        this.belongsToMany(models.Produto, { foreignKey:'id_venda', through: 'conter', as: 'vendas'})
    }
}

module.exports = Venda;