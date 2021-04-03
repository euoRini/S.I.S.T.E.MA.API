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
        this.hasMany(models.Acesso, {foreignKey: 'id_admin', as: 'ADMacessos'});
        this.hasMany(models.Recarga, {foreignKey: 'id_admin', as: 'AdmRec'});
    }
}

module.exports = Admins;
