/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Parameter', {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    value: {
      field: 'valeur',
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      field: 'commentaire',
      type: DataTypes.STRING,
      allowNull: true
    },
    values: {
      field: 'valeurs',
      type: DataTypes.STRING,
      allowNull: true
    }
  }, 
  {
    timestamps: false
  }, 
  {
    tableName: 'parametrage'
  });
};
