const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(connection){
    super.init({
      matricula: DataTypes.INTEGER,
      nome: DataTypes.STRING,
      email: DataTypes.STRING,
      saldo: DataTypes.INTEGER,
  },{
    sequelize: connection
  })
  }
  static associate(models) {
    this.hasMany(models.Recarga, {foreignKey: 'id_user', as: 'CrdRec'});
  }
}

module.exports = User;
