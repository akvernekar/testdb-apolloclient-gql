const {GraphQLObjectType,GraphQLInt,GraphQLString}=require("graphql");

var teamType= new GraphQLObjectType({
   name:"Teams" ,
   fields:()=>(teamArgs)
});


var teamArgs={
    id:{type:GraphQLInt},
    teamName:{type:GraphQLString},
    departmentId:{type:GraphQLInt},
    companyId:{type:GraphQLInt},
    tenantId:{type:GraphQLInt}
}


module.exports = {teamType,teamArgs}
