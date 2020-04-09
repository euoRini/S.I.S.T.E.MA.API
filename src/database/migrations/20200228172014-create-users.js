'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('users', {
        id:{
          primaryKey: true,
          type: Sequelize.INTEGER,          
          allowNull: false,
          autoIncrement: true,
        },
        matricula: {
            type: Sequelize.STRING(14),
            allowNull: false,
            unique: true,
         },
        nome: {
          type: Sequelize.STRING(50),
          allowNull: false,
         },
        email: {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: true,
        },
        saldo: {
          type: Sequelize.INTEGER(10),
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
    return queryInterface.dropTable('users');
  }
};
