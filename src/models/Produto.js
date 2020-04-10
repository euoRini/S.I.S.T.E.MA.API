const { Model, DataTypes } = require('sequelize');

class Produto extends Model {
    static init(connection) {
      super.init({
        nome: DataTypes.STRING(50),
        preco: DataTypes.DECIMAL,
        estoque: DataTypes.INTEGER,
        categoria: DataTypes.STRING(50),
    },{
        sequelize: connection,
        tableName: 'produtos',
    })
}
    static associate(models){
        this.belongsToMany(models.Venda, { foreignKey:'id_produto', through: 'conter', as: 'vendas'})
    }
}

module.exports = Produto;