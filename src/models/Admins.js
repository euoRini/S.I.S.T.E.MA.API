const { Model, DataTypes } = require('sequelize');

class Admins extends Model {
    static init(connection) {
      super.init({
        nome: DataTypes.STRING,
        login: DataTypes.STRING,
        senha: DataTypes.STRING,
        email: DataTypes.STRING,
    },  {
            sequelize: connection
        })
    }
    static associate(models) {
        this.belongsToMany(models.Acesso, {foreignKey: 'id_admin', as: 'ADMacessos'});
    }
}

module.exports = Admins;
