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
        this.hasOne(models.Conter, {foreignKey: 'id_venda', as: 'ContVenda'})

    }
}

module.exports = Venda;