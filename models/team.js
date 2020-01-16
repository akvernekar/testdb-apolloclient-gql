'use strict';
module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('Team', {
    teamName: DataTypes.STRING,
    tenantId:DataTypes.INTEGER,
    companyId:DataTypes.INTEGER,
    departmentId:DataTypes.INTEGER
  }, {});
  Team.associate = function(models) {
    // associations can be defined here
  };
  return Team;
};