const {GraphQLSchema,GraphQLObjectType,GraphQLList,GraphQLString,GraphQLInt} = require("graphql");

const Team=require("../../models").Team;
const {teamArgs,teamType} =require("./teamType");

var queryType=new GraphQLObjectType({
    name:"Query",
    fields:()=>({
        /*
        moduleName : Team,
        API For : get All Teams,
        objective : getting All Teams by API
        ###########################
        Request Params :
        #########################
        
        ###########################
        Response : 
        ###########################
        id :: Integer
        teamName:: String
        departmentId :: Integer
        tenantId :: Integer
        companyId::Integer
*/

        getAllTeams:{
           type:new GraphQLList(teamType) ,
           resolve:async()=>{
               const allTeams=await Team.findAll();
               if(!allTeams.length){throw new Error("Teams not found");}
               return allTeams;
           }
        },
/*
        moduleName : Team,
        API For : get Single Team,
        objective : getting Single Team by API
        ###########################
        Request Params :
        #########################
        id :: Integer
        ###########################
        Response : 
        ###########################
        id :: Integer
        teamName:: String
        departmentId :: Integer
        tenantId :: Integer
        companyId::Integer
*/

        getSingleTeam:{
            type:teamType,
            args:teamArgs,
            resolve:async (args,params)=>{
              const singleTeam=await Team.findByPk(params.id);    
              if(!singleTeam){throw new Error("Team ID not found");} 
              return singleTeam;
            }
        }
    })
});

var mutation=new GraphQLObjectType({
    name:"Mutation",
    fields:()=>({
        /*
        moduleName : Team,
        API For : Add Team,
        objective : Add Team by API
        ###########################
        Request Params :
        #########################
        teamName:: String
        departmentId :: Integer
        tenantId :: Integer
        companyId::Integer
        ###########################
        Response : 
        ###########################
        id :: Integer
        teamName:: String
        departmentId :: Integer
        tenantId :: Integer
        companyId::Integer
*/
        addTeam:{
            type:teamType,
            args:teamArgs,
            resolve:async(args,params)=>{
                const Team=await Team.create(params);
               return Team;
            }
        },
         /*
        moduleName : Team,
        API For :Remove Team,
        objective : Remove Team by API
        ###########################
        Request Params :
        #########################
        id :: Integer
        ###########################
        Response : 
        ###########################
        id :: Integer
        teamName:: String
        departmentId :: Integer
        tenantId :: Integer
        companyId::Integer
*/
        removeTeam:{
            type:teamType,
            args:teamArgs,
            resolve:async (args,params)=>{
                let item= await Team.findByPk(params.id)
                if(!item){throw new Error("Team ID not found")}
               let deleted=await Team.destroy({where:{id:item.id}})
               if(deleted){
                return item
               }
                
            }
        },
         /*
        moduleName : Team,
        API For :Update Team,
        objective : Update Team by API
        ###########################
        Request Params :
        #########################
        id :: Integer
        teamName:: String
        departmentId :: Integer
        tenantId :: Integer
        companyId::Integer
        ###########################
        Response : 
        ###########################
        id :: Integer
        teamName:: String
        departmentId :: Integer
        tenantId :: Integer
        companyId::Integer
*/
        updateTeam:{
            type:teamType,
            args:teamArgs,
            resolve:async (args,params)=>{
                const updatingTeam=await Team.findByPk(params.id);
                if(!updatingTeam){throw new Error("Team ID not found");}
                let updated= await Team.update(params,{where:{id:params.id},returning:true,plain:true});
                return updated[1].dataValues;
            }
        }
    })
})

module.exports=new GraphQLSchema({
query:queryType,
mutation
});