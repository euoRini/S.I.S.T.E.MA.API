const { Model, DataTypes } = require('sequelize');

class Vendedor extends Model {
    static init(connection) {
      super.init({
        matricula: DataTypes.STRING(50),
        nome: DataTypes.STRING(50),
        email: DataTypes.STRING(50),
        senha: DataTypes.STRING(100),
    },  {
            sequelize: connection   
        })
    }
    static associate(models){
        this.hasMany(models.Acesso, {foreignKey: 'id_vendedor', as: 'VENDacessos'});
    }
}

module.exports = Vendedor;