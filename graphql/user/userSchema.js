const {GraphQLSchema,GraphQLObjectType,GraphQLList,GraphQLString,GraphQLInt} = require("graphql");
const Op = require('sequelize').Op

const User =require('../../models').User
const {userArgs,userType}=require('./userType')


var queryType=new GraphQLObjectType({
    name:"Query",
    fields:()=>({
        getAllUsers:{
            type:new GraphQLList(userType),
            resolve:()=>{
                return User.findAll()
            }
        },
        getSingleUser:{
            type:userType,
            args:userArgs,
            resolve:(args,params)=>{
                return User.findOne({where:{
                    [Op.or]:[{id:params.id || null},{email:params.email || null}]
                }})

            }
        }
    })
});

var mutation = new GraphQLObjectType({
    name:"Mutation",
    fields:()=>({
        addUser:{
            type:userType,
            args:userArgs,
            resolve:(args,params)=>{
                return User.create(params)
            }
        },
        removeUser:{
            type:userType,
            args:userArgs,
            resolve:async (args,params)=>{
                const deletedItem = await User.findByPk(params.id)
                const deleted=await User.destroy({where:{id:params.id},returning:true})
                if(deleted){
                    return deletedItem
                }
            }
        },
        updateUser:{
            type:userType,
            args:userArgs,
            resolve:async (args,params)=>{
                const updatedUser= await User.update(params,{where:{id:params.id},returning:true,plain:true})
                return updatedUser[1].dataValues
            }
        }
    })
})

module.exports=new GraphQLSchema({
    query:queryType,
    mutation
})