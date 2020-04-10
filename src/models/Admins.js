const { Model, DataTypes } = require('sequelize');

class Admins extends Model {
    static init(connection) {
      super.init({
        nome: DataTypes.STRING(50),
        login: DataTypes.STRING(50),
        senha: DataTypes.STRING(100),
        email: DataTypes.STRING(50),
    },  {
            sequelize: connection
        })
    }
    static associate(models) {
        this.hasMany(models.Acesso, {foreignKey: 'id_admin', as: 'ADMacessos'});
        

    }
}

module.exports = Admins;