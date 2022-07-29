'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('tasks', "user_id", {
      type: Sequelize.UUID,
      references: {
        model: { tableName: 'users' },
        key: "id"
      },

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('tasks', 'user_id');
  }
};