'use strict';

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('HeaterPeriod', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      idProfil: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      idMode: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      idType: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      startTime: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      endTime: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      days: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      date: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    {
      timestamps: false,
      tableName: 'heaterPeriod'
    });
};
