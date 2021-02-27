const { Model, DataTypes } = require('sequelize');

class Departamento extends Model {
    static init(connection) {
        super.init({
            nome: DataTypes.STRING,
            categoria: DataTypes.STRING,
    },  {
            sequelize: connection   
        })
    }
    static associate(models){
        this.hasMany(models.Vendedor, { foreignKey: 'id_vendedor', as: 'vendedor'});
    }
}

module.exports = Departamento;