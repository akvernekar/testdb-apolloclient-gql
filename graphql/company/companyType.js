const {GraphQLObjectType,GraphQLInt,GraphQLString}=require("graphql");

var companyType=new GraphQLObjectType({
    name:"companies",
    fields:()=>{
        return {
            id:{type:GraphQLInt},
            companyName:{type:GraphQLString},
            tenantId:{type:GraphQLInt},
           }
    }
});

var companyArgs={
    id:{type:GraphQLInt},
    companyName:{type:GraphQLString},
    tenantId:{type:GraphQLInt}
}

module.exports={companyType ,companyArgs}


