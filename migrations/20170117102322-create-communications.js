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
        type: Sequelize.STRING
      },
      xid: {
        type: Sequelize.STRING
      },
      endpoint: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      esbReqBody: {
        type: Sequelize.JSONB
      },
      esbResBody: {
        type: Sequelize.JSONB
      },
      vendorReqBody: {
        type: Sequelize.JSONB
      },
      vendorResBody: {
        type: Sequelize.JSONB
      },
      hybridReqBody: {
        type: Sequelize.JSONB
      },
      hybridResBody: {
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