'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('HeaterPeriod', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    day: {
      field: 'jour',
      type: DataTypes.INTEGER,
      allowNull: true
    },
    startDate: {
      field: 'dateDebut',
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    endDate: {
      field: 'dateFin',
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    startTime: {
      field: 'heureDebut',
      type: DataTypes.TIME,
      allowNull: true
    },
    endTime: {
      field: 'heureFin',
      type: DataTypes.TIME,
      allowNull: true
    },
    modeId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },
  {
    timestamps: false,
    tableName: 'periode'
  });
};
