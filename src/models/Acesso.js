const { Model, DataTypes } = require('sequelize');

class Acesso extends Model {
  static init(connection){
    super.init({
      nome_vendedor: DataTypes.INTEGER,
      nome_admin: DataTypes.STRING,
  },{
    sequelize: connection
  })
  }
  static associate(models){
    this.hasOne(models.Vendedor, {foreignKey:'id_vendedor', as:'vendedor'});
    this.hasOne(models.Admins, {foreignKey:'id_admin', as:'admin'});
  }
}

module.exports = Acesso;