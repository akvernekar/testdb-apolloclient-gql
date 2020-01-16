'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userName: {
        type: Sequelize.STRING
      },
      email:{
        type:Sequelize.STRING,
        allowNull:false
      },
      mobile:{
        type:Sequelize.STRING,
        allowNull:false
      },
      password:{
        type:Sequelize.STRING,
        allowNull:false
      },
      role:{
        type:Sequelize.ENUM,
        values:['admin','user','superAdmin'],
        defaultValue:'user',
        allowNull:false
      },
      companyId:{
        type:Sequelize.INTEGER,
        allowNull:false
      },
      tenantId:{
        type:Sequelize.INTEGER,
        allowNull:false
      },
      departmentId:{
        type:Sequelize.INTEGER,
        allowNull:false
      },
      teamId:{
        type:Sequelize.INTEGER,
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};