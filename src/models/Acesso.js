const { Model, DataTypes } = require('sequelize');

class Acesso extends Model {
  static init(connection){
    super.init({
      data_acesso: DataTypes.DATE,
  },{
    sequelize: connection
  })
  }
  static associate(models){
    this.belongsTo(models.Admins, {foreignKey:'id_admin', as:'admin'});
    this.belongsTo(models.Vendedor, {foreignKey:'id_vendedor', as:'vendedor'});
  }
}

module.exports = Acesso;