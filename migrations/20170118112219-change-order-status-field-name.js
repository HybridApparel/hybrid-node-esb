'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.renameColumn('orders', 'OrderStatusID', 'OrderStatus');

  },

  down: function (queryInterface, Sequelize) {

  }
};