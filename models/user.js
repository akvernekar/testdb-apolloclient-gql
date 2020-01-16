'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userName: DataTypes.STRING,
    email:{type:DataTypes.STRING,
      unique: true},
    mobile:DataTypes.STRING,
    password:DataTypes.STRING,
    role:{
    type:DataTypes.ENUM('admin','user','superAdmin'),
    allowNull:false,
    defaultValue:'user'
  },
  companyId:DataTypes.INTEGER,
  tenantId:DataTypes.INTEGER,
  departmentId:DataTypes.INTEGER,
  teamId:DataTypes.INTEGER
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    
  };
  return User;
};