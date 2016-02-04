'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TemperatureHistory', {
    date: {
      field: 'date',
      type: DataTypes.TEXT,
      allowNull: true
    },
    time: {
      field: 'heure',
      type: DataTypes.TIME,
      allowNull: true
    },
    temp: {
      field: 'temp',
      type: DataTypes.FLOAT,
      allowNull: true
    },
    sensorId: {
      field: 'sonde',
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },
  {
    timestamps: false,
    tableName: 'histo_temp'
  });
};
