const {
    mergeSchemas
} = require("graphql-tools");

const companySchema= require('./company/companySchema')
const departmentSchema= require('./department/departmentSchema')
const teamSchema =require('./team/teamSchema')
const userSchema =require('./user/userSchema')



const schema = mergeSchemas({
    schemas: [
       companySchema,
       departmentSchema,
       teamSchema,
       userSchema 
    ]
});

module.exports = schema;