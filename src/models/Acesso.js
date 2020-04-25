const { Model, DataTypes } = require('sequelize');

class Acesso extends Model {
  static init(connection){
    super.init({
      matricula_vendedor: DataTypes.INTEGER,
      nome_admin: DataTypes.STRING,
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