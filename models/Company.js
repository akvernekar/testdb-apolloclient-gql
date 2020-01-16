'use strict';
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    companyName:DataTypes.STRING,
    tenantId:DataTypes.INTEGER
  }, {});
  Company.associate = function(models) {
    // associations can be defined here
    // Company.hasMany(models.Department)
    // Company.hasMany(models.Company)
  };
  return Company;
};