/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('HeaterMode', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    label: {
      field: 'libelle',
      type: DataTypes.STRING,
      allowNull: true
    },
    cons: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    max: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  }, 
  {
    timestamps: false
  }, 
  {
    tableName: 'mode'
  });
};
