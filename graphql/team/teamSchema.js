const {GraphQLSchema,GraphQLObjectType,GraphQLList,GraphQLString,GraphQLInt} = require("graphql");

const Team=require('../../models').Team
const {teamArgs,teamType} =require('./teamType')

var queryType=new GraphQLObjectType({
    name:'Query',
    fields:()=>({
        getAllTeams:{
           type:new GraphQLList(teamType) ,
           resolve:()=>{
               return Team.findAll()
           }
        },
        getSingleTeam:{
            type:teamType,
            args:teamArgs,
            resolve:(args,params)=>{
               return Team.findByPk(params.id)     
            }
        }
    })
});

var mutation=new GraphQLObjectType({
    name:'Mutation',
    fields:()=>({
        addTeam:{
            type:teamType,
            args:teamArgs,
            resolve:(args,params)=>{
                return Team.create(params)
            }
        },
        removeTeam:{
            type:teamType,
            args:teamArgs,
            resolve:async (args,params)=>{
                let item= await Team.findByPk(params.id)
               let deleted=await Team.destroy({where:{id:item.id}})
               if(deleted===1){
                return item
               }
                
            }
        },
        updateTeam:{
            type:teamType,
            args:teamArgs,
            resolve:async (args,params)=>{
                let updated= await Team.update(params,{where:{id:params.id}})
                if(updated.length===1){
                    return Team.findByPk(params.id)
                }
            }
        }
    })
})

module.exports=new GraphQLSchema({
query:queryType,
mutation
})