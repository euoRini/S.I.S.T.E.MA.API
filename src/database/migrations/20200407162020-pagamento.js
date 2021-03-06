'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pagamentos', {
      id:{
        primaryKey: true,
        type: Sequelize.INTEGER,          
        allowNull: false,
        autoIncrement: true,
      },
      id_venda: {
        type: Sequelize.INTEGER,
        references: { 
          model: 'vendas',
          key: 'id',
        },      
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', 
      },
      total_pagto: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      id_cartao:{
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
    return queryInterface.dropTable('pagamentos');
  }
};
