'use strict';
module.exports = function(sequelize, DataTypes) {
  var communications = sequelize.define('communications', {
    orderID: DataTypes.INTEGER,
    shipmentID: DataTypes.INTEGER,
    xid: DataTypes.STRING,
    endpoint: DataTypes.STRING,
    reqOrigin: DataTypes.STRING,
    status: DataTypes.STRING,
    reqBody: DataTypes.JSONB,
    resBody: DataTypes.JSONB,
    reqType: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return communications;
};