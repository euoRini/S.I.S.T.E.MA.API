const { Model, DataTypes } = require('sequelize');

class Pagamento extends Model {
    static init(connection) {
        super.init({
            total_pagto: DataTypes.INTEGER,
        },{
            sequelize: connection
        })
    }
    static associate(models){
        this.belongsTo(models.Venda, { foreignKey: 'id_venda', as: 'venda'});
      }
}

module.exports = Pagamento;