'use strict';

module.exports = profil;

function profil(sequelize, DataTypes){
  return sequelize.define('Profil', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      startDate: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      endDate: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      isDefault: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      timestamps: false
    });
}
