'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('communications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderID: {
        type: Sequelize.INTEGER
      },
      shipmentID: {
        type: Sequelize.INTEGER
      },
      xid: {
        type: Sequelize.STRING
      },
      endpoint: {
        type: Sequelize.STRING
      },
      reqOrigin: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      reqBody: {
        type: Sequelize.JSONB
      },
      resBody: {
        type: Sequelize.JSONB
      },
      reqType: {
        type: Sequelize.STRING
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
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('communications');
  }
};