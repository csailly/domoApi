/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('histoTrameMcz', {
    sendDate: {
      field: 'dateEnvoi',
      type: DataTypes.DATE,
      allowNull: true
    },
    order: {
      field: 'ordre',
      type: DataTypes.TEXT,
      allowNull: true
    },
    power: {
      field: 'puissance',
      type: DataTypes.TEXT,
      allowNull: true
    },
    ventilation: {
      field: 'ventilation',
      type: DataTypes.TEXT,
      allowNull: true
    },
    frameFlag: {
      field: 'flagTrame',
      type: 'CHAR',
      allowNull: true
    },
    orderType: {
      field: 'typeOrdre',
      type: DataTypes.TEXT,
      allowNull: true
    },
    message: {
      field: 'message',
      type: DataTypes.TEXT,
      allowNull: true
    }
  });
};
