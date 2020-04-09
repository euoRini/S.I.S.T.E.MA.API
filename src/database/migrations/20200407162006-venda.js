'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('vendas', {
      id:{
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
      },

      total_venda:{
        type: Sequelize.INTEGER,
        allowNull:false,        
      },

      id_vendedor: {
        type: Sequelize.INTEGER,
        references: {
          model: 'vendedors',
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
      return queryInterface.dropTable('vendas');
  }
};
