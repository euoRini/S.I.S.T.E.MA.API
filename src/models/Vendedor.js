const { Model, DataTypes } = require('sequelize');

class Vendedor extends Model {
    static init(connection) {
      super.init({
        matricula: DataTypes.STRING,
        nome: DataTypes.STRING,
        email: DataTypes.STRING,
        senha: DataTypes.STRING,
    },  {
            sequelize: connection   
    })
    }
    static associate(models){
        this.hasMany(models.Acesso, {foreignKey: 'id_vendedor', as: 'VENDacessos'});
        this.belongsTo(models.Departamento, {foreignKey:'id_depto', as:'VENDEPTO'})
    }
}

module.exports = Vendedor;