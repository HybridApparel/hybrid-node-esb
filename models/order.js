'use strict';
module.exports = function(sequelize, DataTypes) {
  var orders = sequelize.define('orders', {
    OrderXrefUid: DataTypes.STRING,
    OrderID: DataTypes.STRING,
    OrderDetailUid: DataTypes.STRING,
    Method: DataTypes.STRING,
    ESBResponseID: DataTypes.STRING,
    Body: DataTypes.JSONB,
    isProcessed: DataTypes.BOOLEAN,
    EndpointResponseID: DataTypes.STRING,
    EndpointResponseBody: DataTypes.JSONB,
    OrderStatus: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        orders.hasMany(models.shipments, {foreignKey: 'orderID'});
      }
    }
  });
  return orders;
};