'use strict';
module.exports = function(sequelize, DataTypes) {
  var shipments = sequelize.define('shipments', {
    orderID: DataTypes.INTEGER,
    status: DataTypes.STRING,
    tracking_number: DataTypes.STRING,
    body: DataTypes.JSONB
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        shipments.belongsTo(models.orders, {foreighKey: "orderID"});
      }
    }
  });
  return shipments;
};