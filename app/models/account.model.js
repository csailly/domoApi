'use strict';

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Account', {
      login: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      timestamps: false,
      tableName: 'ACCOUNTS'
    });
};
