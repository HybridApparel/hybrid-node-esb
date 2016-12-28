'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.renameColumn('shipments', 'order_id', 'orderID');

  },

  down: function (queryInterface, Sequelize) {

  }
};
