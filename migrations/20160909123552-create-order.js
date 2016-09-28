'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      OrderXrefUid: {
        type: Sequelize.STRING
      },
      OrderID: {
        allowNull: false,
        type: Sequelize.STRING
      },
      OrderDetailUid: {
        type: Sequelize.STRING
      },
      Method: {
        type: Sequelize.STRING
      },
      ESBResponseID: {
        type: Sequelize.STRING
      },
      Body: {
        type: Sequelize.JSONB
      },
      isProcessed: {
        type: Sequelize.BOOLEAN
      },
      EndpointResponseID: {
        type: Sequelize.STRING
      },
      EndpointResponseBody: {
        type: Sequelize.JSONB
      },
      OrderStatusID: {
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
    return queryInterface.dropTable('orders');
  }
};