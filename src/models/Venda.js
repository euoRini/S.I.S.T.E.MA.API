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
        this.belongsTo(models.Vendedors, {foreingKey: 'vendedor_id', as: 'vendedor'});
//        this.belongsToMany(models.Produto, { foreignKey:'id_venda', through: 'conter', as: 'vendas'})
    }
}

module.exports = Venda;