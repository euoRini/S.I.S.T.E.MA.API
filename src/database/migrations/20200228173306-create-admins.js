'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('admins', { 
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
        login: {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: true,
        },
        senha: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: true,
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
      return queryInterface.dropTable('admins');
  }
};
