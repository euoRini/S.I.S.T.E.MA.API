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
        allowNull:false,
        type: Sequelize.INTEGER,
        references: { 
          model: 'vendedors', 
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      id_admin: {
        allowNull:true,
        type: Sequelize.INTEGER,
        references: { 
          model: 'admins', 
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      matricula_vendedor: {
        type: Sequelize.STRING(14),
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
     return queryInterface.dropTable('acessos');
  }
};
