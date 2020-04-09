const { Model, DataTypes } = require('sequelize');

class Recarga extends Model {
    static init(sequelize) {
      super.init({
        data_recarga: DataTypes.DATE,
        modo_pagto: DataTypes.STRING,
        valor_recarga: DataTypes.INTEGER,
      }, {
        sequelize   
      })
    }
    static associate(models){
      this.belongsTo(models.User, { foreignKey: 'id_cartao', as: 'user'});
    }
}

module.exports = Recarga;