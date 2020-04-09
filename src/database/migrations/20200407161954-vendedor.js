'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('vendedors', {
      id:{
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
      },

      matricula:{
        unique: true,
        type: Sequelize.STRING(50),
        allowNull: false,
      },

      nome:{
        type: Sequelize.STRING(50),
        allowNull: false,
      },

      email:{
        unique: true,
        type: Sequelize.STRING(50),
        allowNull: false,
      },

      senha:{
        type: Sequelize.STRING(100),
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
      return queryInterface.dropTable('vendedors');
  }
};
