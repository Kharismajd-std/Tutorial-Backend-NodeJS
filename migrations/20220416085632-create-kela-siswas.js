'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('KelaSiswas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idSiswa: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Siswas',
          key: 'id'
        }
      },
      idKelas: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Kelas',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('KelaSiswas');
  }
};