'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('departamentos', {
      id:{
        primaryKey: true,
        type: Sequelize.INTEGER,          
        allowNull: false,
        autoIncrement: true,
      },

      nome: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },

      categoria: {
        type: Sequelize.STRING(50),
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
    return queryInterface.dropTable('departamentos');
  }
};
