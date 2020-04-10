'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('recargas', {
        id: {
          primaryKey: true,
          type: Sequelize.INTEGER,          
          allowNull: false,
          autoIncrement: true,
        },
        modo_pagto: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        valor_recarga: {
          type: Sequelize.INTEGER,
          allowNull: false, 
        },
        id_cartao: {
          type: Sequelize.INTEGER,
          references: {
            model: 'users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',

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
    return queryInterface.dropTable('recargas');
  }
};

