const {GraphQLSchema,GraphQLObjectType,GraphQLList,GraphQLString,GraphQLInt} = require("graphql");

const Company=require('../../models').Company;
const {companyType,companyArgs} = require('./companyType');

var queryType=new GraphQLObjectType({
    name:"Query",
    fields:()=>({
        getAllCompanies:{
            type:new GraphQLList(companyType),
            resolve:async ()=>{
                return await Company.findAll()
            }
        },
        getSingleCompany:{
            type:companyType,
            args:companyArgs,
            resolve: async (args,params)=>{
                return Company.findByPk(params.id)
            }
        }
    })
});

var mutation=new GraphQLObjectType({
    name:"Mutation",
    fields:()=>({
        addCompany:{
            type:companyType,
            args:companyArgs,
            resolve:async (args,params)=>{
                let company= await Company.create(params)
                return company
            }
        },
        removeCompany:{
            type:companyType,args:companyArgs,
            resolve:async(arg,params)=>{
              let item=await Company.findOne({where:{id:params.id}})
              let deletedItem= await Company.destroy({where:{id:item.id}}) //it returns 1 id deleted
              if(deletedItem===1){
              return item;
              }
            }
          },
        updateCompany:{
            type:companyType,
            args:companyArgs,
            resolve:async(args,params)=>{
               let update=await Company.update(params,{where:{id:params.id}})
                if(update.length===1){
                    let updatedCompany= await Company.findOne({where:{id:params.id}})
                    return updatedCompany
                   }
            }
        }
    })
})


module.exports=new GraphQLSchema({
    query:queryType,
    mutation:mutation
   
})