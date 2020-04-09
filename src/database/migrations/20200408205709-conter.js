'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('conter', {
      id:{
        primaryKey: true,
        type: Sequelize.INTEGER,          
        allowNull: false,
        autoIncrement: true,
      },

      id_venda:{
        primaryKey: true,
        type: Sequelize.INTEGER,
        references:{
          model: 'vendas',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      id_produto:{
        primaryKey: true,
        type: Sequelize.INTEGER,
        references:{
          model: 'produtos',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      data:{
        primaryKey: true,
        type: Sequelize.DATE,
        allowNull: false,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: { 
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('conter');
  }
};
