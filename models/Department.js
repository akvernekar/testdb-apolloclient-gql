'use strict';
module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    departmentName: DataTypes.STRING,
    companyId:DataTypes.INTEGER,
    tenantId:DataTypes.INTEGER
  }, {});
  Department.associate = function(models) {
    // associations can be defined here
    // Department.belongsTo(models.Company)
    // Department.hasMany(models.Team)
  };
  return Department;
};