const {GraphQLSchema,GraphQLObjectType,GraphQLList,GraphQLString,GraphQLInt} = require("graphql");

const Company=require("../../models").Company;
const {companyType,companyArgs} = require("./companyType");

var queryType=new GraphQLObjectType({
    name:"Query",
    fields:()=>({
/*
        moduleName : Company,
        API For : get All Companies,
        objective : getting all companies by API
        ###########################
        Request Params :
        #########################
        
        ###########################
        Response : 
        ###########################
        id :: Integer
        companyName :: String
        tenantId :: Integer
*/

        getAllCompanies:{
            type:new GraphQLList(companyType),
            resolve:async ()=>{
                let allComp = await Company.findAll();
                if(!allComp.length){ throw new Error("Company not Found"); }
                return allComp; 
            }
        },

/*
        moduleName : Company,
        API For : get Single Company,
        objective : getting single company by API
        ###########################
        Request Params :
        #########################
        id :: Integer
        ###########################
        Response : 
        ###########################
        id :: Integer
        companyName :: String
        tenantId :: Integer
*/

          getSingleCompany:{
            type:companyType,
            args:companyArgs,
            resolve: async (args,params)=>{
                let singleComp = await Company.findByPk(params.id);
                if(!singleComp) { throw new Error("Company with given ID not Found");}
                return singleComp;
            }
        }
    })
});

var mutation=new GraphQLObjectType({
    name:"Mutation",
    fields:()=>({

/*
        moduleName : Company,
        API For : Add Company,
        objective : Add company by API
        ###########################
        Request Params :
        #########################
        companyName :: String
        tenantId :: Integer
        ###########################
        Response : 
        ###########################
        id :: Integer
        companyName :: String
        tenantId :: Integer
*/

        addCompany:{
            type:companyType,
            args:companyArgs,
            resolve:async (args,params)=>{
                let company= await Company.create(params);
                return company;
            }
        },
/*
        moduleName : Company,
        API For : Remove Company,
        objective : Remove company by API
        ###########################
        Request Params :
        #########################
        id :: Integer
        ###########################
        Response : 
        ###########################
        id :: Integer
        companyName :: String
        tenantId :: Integer
*/

        removeCompany:{
            type:companyType,args:companyArgs,
            resolve:async(arg,params)=>{
              let item=await Company.findOne({where:{id:params.id}})
              if(!item){throw new Error("company id not found");}
              let deletedItem= await Company.destroy({where:{id:item.id}}) //it returns 1 id deleted
             if(deletedItem){
               return item;
             }
               
            }
          },

          /*
        moduleName : Company,
        API For : Update Company,
        objective : Update company by API
        ###########################
        Request Params :
        #########################
        id :: Integer
        companyName :: String
        tenantId :: Integer
        ###########################
        Response : 
        ###########################
        id :: Integer
        companyName :: String
        tenantId :: Integer
*/
        updateCompany:{
            type:companyType,
            args:companyArgs,
            resolve:async(args,params)=>{
                let updatingCompany= await Company.findByPk(params.id)
                // console.log(updatingCompany)
                if(!updatingCompany){throw new Error("company id not found");}
               let update=await Company.update(params,{where:{id:params.id},returning:true,plain:true})
                return update[1].dataValues;
                
                }
        }
    })
});


module.exports=new GraphQLSchema({
    query:queryType,
    mutation:mutation
   
});