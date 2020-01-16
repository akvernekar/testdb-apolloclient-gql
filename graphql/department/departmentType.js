const {GraphQLObjectType,GraphQLInt,GraphQLString}=require("graphql");


var departmentType= new GraphQLObjectType({
    name:"departments",
    fields:()=>{
       return {
           id:{type:GraphQLInt},
           departmentName:{type:GraphQLString},
           companyId:{type:GraphQLInt},
           tenantId:{type:GraphQLInt}
       }
    }
});

var departmentArgs={
 id:{type:GraphQLInt},
 departmentName:{type:GraphQLString},
 companyId:{type:GraphQLInt},
 tenantId:{type:GraphQLInt}
}


module.exports ={departmentType ,departmentArgs}