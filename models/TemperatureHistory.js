/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TemperatureHistory', {
    date: {
      field: 'date',
      type: DataTypes.DATE,
      allowNull: true
    },
    time: {
      field: 'heure',
      type: DataTypes.DATE,
      allowNull: true
    },
    temp: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    sensor: {
      field: 'sonde',
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, 
  {
    timestamps: false
  }, 
  {
    tableName: 'histo_temp'
  });
};
