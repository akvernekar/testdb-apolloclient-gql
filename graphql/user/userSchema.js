const {GraphQLSchema,GraphQLObjectType,GraphQLList,GraphQLString,GraphQLInt} = require("graphql");
const Op = require("sequelize").Op;

const User =require("../../models").User;
const {userArgs,userType}=require("./userType");


var queryType=new GraphQLObjectType({
    name:"Query",
    fields:()=>({
         /*
        moduleName : User,
        API For : get All Users,
        objective : getting All Users by API
        ###########################
        Request Params :
        #########################
        
        ###########################
        Response : 
        ###########################
        id :: Integer
        userName::String
        email::String
        password::String
        mobile::String
        role::String
        teamId:: Integer
        departmentId :: Integer
        tenantId :: Integer
        companyId::Integer
*/
        getAllUsers:{
            type:new GraphQLList(userType),
            resolve:async()=>{
                const allUsers=await User.findAll();
                if(!allUsers.length){throw new Error("users not found");}
                return allUsers;
            }
        },
        /*
        moduleName : User,
        API For : get Single User,
        objective : getting Single User by API
        ###########################
        Request Params :
        #########################
        id :: Integer
        email::String
        ###########################
        Response : 
        ###########################
        id :: Integer
        userName::String
        email::String
        password::String
        mobile::String
        role::String
        teamId:: Integer
        departmentId :: Integer
        tenantId :: Integer
        companyId::Integer
*/
        getSingleUser:{
            type:userType,
            args:userArgs,
            resolve:async (args,params)=>{
                const singleUser=await User.findOne({where:{
                    [Op.or]:[{id:params.id || null},{email:params.email || null}]
                }});
                if(!singleUser){throw new Error("User ID not found");}
                return singleUser

            }
        }
    })
});

var mutation = new GraphQLObjectType({
    name:"Mutation",
    fields:()=>({
         /*
        moduleName : User,
        API For : Add User,
        objective : Add User by API
        ###########################
        Request Params :
        #########################
        userName::String
        email::String
        password::String
        mobile::String
        role::String
        teamId:: Integer
        departmentId :: Integer
        tenantId :: Integer
        companyId::Integer
        ###########################
        Response : 
        ###########################
        id :: Integer
        userName::String
        email::String
        password::String
        mobile::String
        role::String
        teamId:: Integer
        departmentId :: Integer
        tenantId :: Integer
        companyId::Integer
*/
        addUser:{
            type:userType,
            args:userArgs,
            resolve:async(args,params)=>{
                const user=await User.create(params);
                return user;
            }
        },
         /*
        moduleName : User,
        API For : Add User,
        objective : Add User by API
        ###########################
        Request Params :
        #########################
        id :: Integer
        ###########################
        Response : 
        ###########################
        id :: Integer
        userName::String
        email::String
        password::String
        mobile::String
        role::String
        teamId:: Integer
        departmentId :: Integer
        tenantId :: Integer
        companyId::Integer
*/
        removeUser:{
            type:userType,
            args:userArgs,
            resolve:async (args,params)=>{
                const deletedItem = await User.findByPk(params.id)
                if(!deletedItem){throw new Error("user ID not found ")}
                const deleted=await User.destroy({where:{id:params.id},returning:true})
                if(deleted){
                    return deletedItem
                }
            }
        },
         /*
        moduleName : User,
        API For : Add User,
        objective : Add User by API
        ###########################
        Request Params :
        #########################
        id :: Integer
        userName::String
        email::String
        password::String
        mobile::String
        role::String
        teamId:: Integer
        departmentId :: Integer
        tenantId :: Integer
        companyId::Integer
        ###########################
        Response : 
        ###########################
        id :: Integer
        userName::String
        email::String
        password::String
        mobile::String
        role::String
        teamId:: Integer
        departmentId :: Integer
        tenantId :: Integer
        companyId::Integer
*/
        updateUser:{
            type:userType,
            args:userArgs,
            resolve:async (args,params)=>{
                const updatingUser= await User.findByPk(params.id);
                if(!updatingUser){throw new Error("user ID not found")}
                const updatedUser= await User.update(params,{where:{id:params.id},returning:true,plain:true});
                return updatedUser[1].dataValues
            }
        }
    })
});

module.exports=new GraphQLSchema({
    query:queryType,
    mutation
});