'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('HeaterMode', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    label: {
      field: 'libelle',
      type: DataTypes.STRING,
      allowNull: true
    },
    order: {
      field: 'cons',
      type: DataTypes.FLOAT,
      allowNull: true
    },
    max: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  },
  {
    timestamps: false,
    tableName: 'mode'
  });
};
