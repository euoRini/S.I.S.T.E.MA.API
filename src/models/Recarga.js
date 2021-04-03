const { Model, DataTypes } = require('sequelize');

class Recarga extends Model {
    static init(sequelize) {
      super.init({
        modo_pagto: DataTypes.STRING,
        valor_recarga: DataTypes.INTEGER,
      }, {
        sequelize   
      })
    }
    static associate(models){
      this.belongsTo(models.User, { foreignKey: 'id_cartao', as: 'CrdRec'});
      this.belongsTo(models.Admin, { foreignKey: 'id_admin', as: 'AdmRec'});
    }
}

module.exports = Recarga;