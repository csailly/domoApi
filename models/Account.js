/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ACCOUNTS', {
    login: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
};
