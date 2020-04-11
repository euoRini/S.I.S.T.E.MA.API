const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(connection){
    super.init({
      matricula: DataTypes.STRING,
      nome: DataTypes.STRING,
      email: DataTypes.STRING,
      saldo: DataTypes.INTEGER,
  },{
    sequelize: connection
  })
  }
}

module.exports = User;
