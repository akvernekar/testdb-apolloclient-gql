const {GraphQLObjectType,GraphQLInt,GraphQLString}=require("graphql");

var userType=new GraphQLObjectType({
    name:"Users",
    fields:()=>(userArgs)
})

var userArgs={
    id:{type:GraphQLInt},
    userName:{type:GraphQLString},
    email:{type:GraphQLString},
    mobile:{type:GraphQLString},
    password:{type:GraphQLString},
    role:{type:GraphQLString},
    companyId:{type:GraphQLInt},
    tenantId:{type:GraphQLInt},
    departmentId:{type:GraphQLInt},
    teamId:{type:GraphQLInt}
};


module.exports ={userArgs,userType}

