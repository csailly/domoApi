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
