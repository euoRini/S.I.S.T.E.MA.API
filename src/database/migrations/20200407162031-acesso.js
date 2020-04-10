'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('acessos', {
      id:{
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
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

      id_admin: {
        type: Sequelize.INTEGER,
        references: { 
          model: 'admins', 
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
     return queryInterface.dropTable('acessos');
  }
};
