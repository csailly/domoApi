/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('periode', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    day: {
      field: 'jour',
      type: DataTypes.STRING,
      allowNull: true
    },
    startDate: {
      field: 'dateDebut',
      type: DataTypes.DATE,
      allowNull: true
    },
    endDate: {
      field: 'dateFin',
      type: DataTypes.DATE,
      allowNull: true
    },
    startHour: {
      field: 'heureDebut',
      type: DataTypes.DATE,
      allowNull: true
    },
    endHour: {
      field: 'heureFin',
      type: DataTypes.DATE,
      allowNull: true
    },
    modeId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  });
};
