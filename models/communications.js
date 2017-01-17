'use strict';
module.exports = function(sequelize, DataTypes) {
  var communications = sequelize.define('communications', {
    orderID: DataTypes.STRING,
    xid: DataTypes.STRING,
    endpoint: DataTypes.STRING,
    status: DataTypes.STRING,
    esbReqBody: DataTypes.JSONB,
    esbResBody: DataTypes.JSONB,
    vendorReqBody: DataTypes.JSONB,
    vendorResBody: DataTypes.JSONB,
    hybridReqBody: DataTypes.JSONB,
    hybridResBody: DataTypes.JSONB,
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